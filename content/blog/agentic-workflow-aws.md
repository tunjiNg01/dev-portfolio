---
title: "True Scale-to-Zero: Running Serverless AI Containers on AWS Fargate"
date: "2026-07-15"
description: "A deep dive into architecting a cost-effective, scale-to-zero AI container pipeline using AWS CDK, SQS, EventBridge Pipes, and ECS Fargate. Stop paying for idle compute."
tag: "Engineering"
---

# True Scale-to-Zero: Running Serverless AI Containers on AWS Fargate

When building background workers or AI agent pipelines, developers often face a dilemma: keep a server running 24/7 to poll a queue (and pay for idle compute), or use AWS Lambda and suffer from strict 15-minute execution limits and restricted memory allocations.

If your task requires heavy lifting—like downloading massive PDFs, batch-parsing them with LlamaParse, and orchestrating complex Bedrock interactions—you need a third option: **AWS ECS Fargate triggered by EventBridge Pipes**.

In this setup, your container is only provisioned when there is a job to do, and you are strictly billed to the millisecond of runtime. When the queue is empty, your compute cost is exactly **$0.00**. No idle payments, no subscriptions.

## The Infrastructure Code

Below is the complete AWS CDK implementation (in TypeScript) that achieves this architecture. I'll break down exactly what each component does.

```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as pipes from 'aws-cdk-lib/aws-pipes';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. VPC Configuration
    const vpc = ec2.Vpc.fromLookup(this, 'DefaultVpc', { vpcId: 'vpc-0123456789abcdef0' });

    // 2. The Ingestion Queue
    const queue = new sqs.Queue(this, 'AgentWorkflowQueue', {
      queueName: 'agent-workflow-queue',
      visibilityTimeout: cdk.Duration.minutes(15),
    });

    // 3. ECS Cluster
    const cluster = new ecs.Cluster(this, 'AgentCluster', {
      vpc,
      clusterName: 'AgentWorkflowCluster',
    });

    // 4. Fargate Task Definition
    const taskDef = new ecs.FargateTaskDefinition(this, 'AgentTaskDef', {
      memoryLimitMiB: 2048,
      cpu: 1024,
    });

    const container = taskDef.addContainer('AgentContainer', {
      // Automatically builds and pushes the local Dockerfile to ECR
      image: ecs.ContainerImage.fromAsset('../', {
        exclude: ['cdk', '.venv', '.git', '__pycache__'],
      }), 
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'AgentWorkflow' }),
      environment: {
        INTERNAL_API_BASE_URL: 'https://api.yourdomain.com/v1',
        LLAMA_CLOUD_API_KEY: 'llx-YOUR-API-KEY-HERE', // Replace with Secret manager in prod
      },
    });

    // 5. IAM Permissions
    const rawFilesBucket = s3.Bucket.fromBucketName(this, 'RawFilesBucket', 'my-raw-files-bucket');
    rawFilesBucket.grantRead(taskDef.taskRole);

    taskDef.taskRole.addToPrincipalPolicy(new iam.PolicyStatement({
      actions: ['bedrock:InvokeModel', 'bedrock:InvokeModelWithResponseStream'],
      resources: ['arn:aws:bedrock:us-east-1::foundation-model/*'],
    }));

    const sg = new ec2.SecurityGroup(this, 'AgentTaskSG', {
      vpc,
      allowAllOutbound: true,
      description: 'Security group for Agent Fargate Task',
    });

    // 6. EventBridge Pipe Roles
    const pipeRole = new iam.Role(this, 'PipeRole', {
      assumedBy: new iam.ServicePrincipal('pipes.amazonaws.com'),
    });
    
    queue.grantConsumeMessages(pipeRole);
    taskDef.grantRun(pipeRole);
    
    pipeRole.addToPolicy(new iam.PolicyStatement({
      actions: ['iam:PassRole'],
      resources: [taskDef.executionRole!.roleArn, taskDef.taskRole.roleArn],
    }));

    // 7. EventBridge Pipe
    const pipe = new pipes.CfnPipe(this, 'AgentWorkflowPipe', {
      name: 'agent-workflow-pipe',
      roleArn: pipeRole.roleArn,
      source: queue.queueArn,
      target: cluster.clusterArn,
      targetParameters: {
        ecsTaskParameters: {
          taskDefinitionArn: taskDef.taskDefinitionArn,
          taskCount: 1,
          launchType: 'FARGATE',
          networkConfiguration: {
            awsvpcConfiguration: {
              subnets: vpc.selectSubnets({ subnetType: ec2.SubnetType.PUBLIC }).subnetIds,
              securityGroups: [sg.securityGroupId],
              assignPublicIp: 'ENABLED',
            },
          },
          overrides: {
            containerOverrides: [
              {
                name: 'AgentContainer',
                // Natively maps the SQS message body into the container's startup command
                command: ['python', 'main.py', '$.body'],
              },
            ],
          },
        },
      },
      sourceParameters: {
        sqsQueueParameters: { batchSize: 1 },
      },
    });
  }
}
```

## How It Works

1. **Ingestion (`sqs.Queue`)**: All incoming jobs are pushed to this SQS queue. 
2. **Container Build (`ecs.ContainerImage.fromAsset`)**: The CDK automatically looks at your local directory, builds your Dockerfile, and pushes it to a private AWS ECR repository.
3. **The Orchestrator (`pipes.CfnPipe`)**: This is the magic. The EventBridge Pipe natively listens to the SQS queue. 
4. **Dynamic Data Injection (`containerOverrides`)**: When a message arrives, the Pipe extracts the raw JSON body (`$.body`) from the SQS message and injects it straight into your container's startup command line array as a runtime argument.
5. **Scale to Zero (The Kill Switch)**: EventBridge spins up the Fargate task. The python script runs, extracts the JSON from `sys.argv[1]`, processes the documents, and crucially, executes `sys.exit(0)` at the very end of the script. 

Because a Fargate container's lifecycle is bound to its primary process, calling `sys.exit(0)` gracefully terminates the container. The exact millisecond that command runs, the container is destroyed, and your AWS billing instantly stops.

## Pros and Cons of this Architecture

### Pros
- **Cost**: You pay absolutely nothing when there are no documents to process. No idle instances. 
- **Time Limits**: Fargate tasks can run for hours, unlike Lambda.
- **Developer Experience**: By using EventBridge Pipes, you don't have to write any boilerplate queue-polling loops (`boto3.receive_message()`).
- **Dynamic Sizing**: Need 16 vCPUs and 32GB of RAM to run a local embedding model? Just change two lines in the CDK task definition.

### Cons
- **Asynchronous Execution**: Because EventBridge Pipes triggers Fargate via the `ecs:RunTask` API, the invocation is *asynchronous*. As soon as AWS successfully allocates the container, the Pipe considers its job done and **immediately deletes the message from SQS**. 
- **No Native Retries**: Because the SQS message is deleted at container *launch*, if your script crashes midway, the message is gone forever. If you need strict retries, replace EventBridge Pipes with **AWS Step Functions**.
- **Cold Start Times**: Fargate container provisioning can take anywhere from 30 to 90 seconds. It is perfect for background jobs, but inappropriate for real-time user-facing APIs.
