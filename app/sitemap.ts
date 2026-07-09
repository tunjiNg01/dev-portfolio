import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '../lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tunji.dev'

  // Standard routes
  const routes = ['', '/about', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Blog posts
  const posts = getAllBlogPosts()
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...blogRoutes]
}
