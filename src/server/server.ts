import express from 'express'

export const start = () => {
  const app = express()
  const port = process.env.PORT || 3000

  app.get('/', (req, res) => {
    res.send({ hi: 'Hello World!' })
  })

  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}
