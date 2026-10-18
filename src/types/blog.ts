export interface BlogPost {
  id: string
  title: string
  readTime: string
  externalUrl?: string
  description?: string
  excerpt?: string
  content?: string
  date?: string
  author?: string
  tags?: string[]
  category?: string
  featured?: boolean
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
  coverGradient?: string
  views?: string
}
