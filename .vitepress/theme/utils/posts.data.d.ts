export interface PostData {
  id: number
  title: string
  content: string
  href: string
  create: number
  update: number
  tags?: string[]
  wordCount: number
  cover?: string
  excerpt: string
  pinned?: boolean
}
export declare const data: PostData[]
