import type { Request, Response } from 'express'
import type NodeCache from 'node-cache'
import { httpError } from '../server/error'
import { validatePostRequest } from './validate'
import { getPosts } from './service'
import { getCachedPosts, setCachedPosts } from './cache'

export const postsController = async(req: Request, res: Response) => {
  try {
    const validPostData = validatePostRequest(req)

    const cache = req.app.get('cache') as NodeCache
    const cachedPosts = getCachedPosts(validPostData, cache)

    const posts = cachedPosts || await getPosts(validPostData)

    if (!cachedPosts) {
      setCachedPosts(validPostData, cache, posts)
    }

    res.json(posts)
    res.status(200)
  } catch (err) {
    httpError(err, res)
  }
}
