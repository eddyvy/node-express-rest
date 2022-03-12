import type { Request } from 'express'
import { InvalidDirectionError, InvalidSortByError, InvalidTagsError, NoTagsError } from './error'
import { Direction, SortBy, ValidPostData } from './types'

export const validatePostRequest = (req: Request): ValidPostData => {
  const { tags, sortBy, direction } = req.query

  if (!tags) throw new NoTagsError()
  if (Array.isArray(tags)) throw new InvalidTagsError()

  // Undefined values for sortBy and direction are valid, applying default values
  const sortByDefined = (sortBy !== undefined) ? sortBy : SortBy.id
  const directionDefined = (direction !== undefined) ? direction : Direction.asc

  if (!Object.values(SortBy).includes(sortByDefined as SortBy))
    throw new InvalidSortByError()

  if (!Object.values(Direction).includes(directionDefined as Direction))
    throw new InvalidDirectionError()

  return {
    tags: (tags as string).split(',').sort(),
    sortBy: sortByDefined as SortBy,
    direction: directionDefined as Direction,
  }
}
