import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'
import { createMarkdownRenderer } from 'vitepress'
// ES模块需要重新声明常量
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const cwd = process.cwd()

let id = 1

interface Post {
  id: number
  title: string
  content: string
  href: string
  create: number
  update: number
  tags?: string[]
  wordCount: number
  cover?: string
  excerpt: string | undefined
  pinned?: boolean
}

// Post数据缓存
const cache: Map<string, { timestamp: number; post: Post }> = new Map()

function countWords(text: string): number {
  // 将连续的英文字母串替换为单个字母
  const replacedText = text.replace(/[a-zA-Z]+/g, 'A')

  const pattern = /[\u4E00-\u9FA5A]/g
  const matches = replacedText.match(pattern)

  let count = 0
  if (matches) {
    count = matches.length
  }
  return count
}

function getPost(md: any, file: string, postDir: string): Post {
  const fullPath = path.join(postDir, file)
  const timestamp = Math.floor(fs.statSync(fullPath).mtimeMs)
  // 缓存直接返回
  const cached = cache.get(fullPath)
  if (cached && timestamp === cached.timestamp) {
    return cached.post
  }

  const src = fs.readFileSync(fullPath, 'utf-8')
  const { data, excerpt, content } = matter(src, { excerpt: true })
  const post: Post = {
    id: id++,
    title: data.title,
    content: content,
    href: `posts/${file.replace(/\.md$/, '.html')}`,
    create: +(new Date(data.date) || timestamp),
    update: timestamp,
    tags: data.tags,
    wordCount: countWords(content),
    cover: data.cover,
    excerpt: excerpt,
    pinned: !!data.pinned
  }

  cache.set(fullPath, { timestamp, post })
  return post
}

// 加载posts文件夹
async function load() {
  const md = await createMarkdownRenderer(cwd)
  const postDir = path.join(cwd, 'posts')
  return fs
    .readdirSync(postDir)
    .filter((file) => file.endsWith('.md') && file !== 'index.md')
    .map((file) => getPost(md, file, postDir))
    .sort((a, b) => {
      // 先按置顶排序,再按创建时间排序
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return b.create - a.create
    })
}

export default {
  watch: path.relative(__dirname, cwd + '/posts/*.md').replace(/\\/g, '/'),
  load,
}
