export type Post = {
  id: number
  author: string
  authorId: number
  likes: number
  popularity: number
  reads: number
  tags: string[]
}

export enum SortBy {
  id = 'id',
  reads = 'reads',
  likes = 'likes',
  popularity = 'popularity'
}

export enum Direction {
  asc = 'asc',
  desc = 'desc'
}

export type ValidPostData = {
  tags: string[]
  sortBy: SortBy
  direction: Direction
}
