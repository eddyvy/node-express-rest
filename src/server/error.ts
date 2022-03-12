import { Response } from 'express'
import { InvalidDirectionError, InvalidSortByError, InvalidTagsError, NoTagsError } from '../posts/error'

export const httpError = (err: unknown, res: Response) => {
  if (
    err instanceof NoTagsError
    || err instanceof InvalidTagsError
    || err instanceof InvalidSortByError
    || err instanceof InvalidDirectionError
  ) {
    res.json({ error: err.message })
    res.status(400)
    return
  }

  res.json({ error: 'Internal Server Error' })
  res.status(500)
}
