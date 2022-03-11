import express from 'express'
import { getRouter } from './router'

export const start = () => {
  const app = express()
  const port = process.env.PORT || 3000

  const router = getRouter()
  app.use('/api', router)

  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}
