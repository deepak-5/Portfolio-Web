import { blogs } from '@/data/blogs'
import BlogsListClient from '@/components/BlogsListClient'

export const metadata = {
  title: 'Blogs | Deepak A C',
  description: 'Technical writings and thoughts on AI engineering',
}

export default function BlogsPage() {
  return <BlogsListClient blogs={blogs} />
}