import { reactive } from 'vue'
import { PostData } from '../utils/posts.data'

interface PostData {
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
  pinned?: boolean // 添加置顶属性
}

interface StoreState {
  selectedPosts: PostData[]
  currTag: string
  currPost: PostData
  searchDialog: boolean
  splashLoading: boolean
  fireworksEnabled: boolean
  SpinePlayerEnabled: boolean
  showDropdownMenu: boolean
  darkMode: 'light' | 'dark' | 'system'
}

const state: StoreState = reactive({
  selectedPosts: [],
  currTag: '',
  currPost: {
    id: 0,
    title: '',
    content: '',
    href: '',
    create: 0,
    update: 0,
    tags: [],
    wordCount: 0,
    cover: '',
    excerpt: '',
  },
  searchDialog: false,
  splashLoading: true,
  fireworksEnabled: true,
  SpinePlayerEnabled: true,
  showDropdownMenu: false,
  darkMode: 'system',
})

export function useStore() {
  return { state }
}
