import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Tunji Hammed, a Full-Stack Software Engineer specializing in Next.js, Flutter, and Serverless Architecture.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
