import type { Request, Response } from 'express'

export const pingController = (req: Request, res: Response) => {
  res.json({ success: true })
  res.status(200)
}
