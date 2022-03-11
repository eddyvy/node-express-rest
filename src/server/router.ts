import { Router } from 'express'
import { pingController } from '../ping/controller'

export const routes = {
  ping: '/ping',
}

export const getRouter = () => {
  const router = Router()

  router.get(routes.ping, pingController)

  return router
}
