import { Router } from 'express'
import { pingController } from '../ping/controller'
import { postsController } from '../posts/controller'

export const routes = {
  ping: '/ping',
  posts: '/posts',
}

export const getRouter = () => {
  const router = Router()

  router.get(routes.ping, pingController)
  router.get(routes.posts, postsController)

  return router
}
