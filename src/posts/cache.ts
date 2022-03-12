import NodeCache from 'node-cache'
import { Post, ValidPostData } from './types'

export const getCachedPosts = (validPostData: ValidPostData, cache: NodeCache): Post[] | null => {
  const dataKey = JSON.stringify(validPostData)
  const cachedPosts = cache.get(dataKey)
  return (cachedPosts) ? cachedPosts as Post[] : null
}

export const setCachedPosts = (validPostData: ValidPostData, cache: NodeCache, posts: Post[]): void => {
  const dataKey = JSON.stringify(validPostData)
  cache.set(dataKey, posts, 300)
}
