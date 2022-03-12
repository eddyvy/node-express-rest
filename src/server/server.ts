import express from 'express'
import { getRouter } from './router'
import NodeCache from 'node-cache'

export const start = (cache: NodeCache) => {
  const port = process.env.PORT || 3000
  const app = express()
  const router = getRouter()

  // Middlewares
  app.set('cache', cache)
  app.use('/api', router)

  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}
