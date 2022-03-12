import { Direction, SortBy } from '../../src/posts/types'

describe('Post types', () => {
  test('Should have correct values for SortBy', () => {
    expect(Object.values(SortBy)).toStrictEqual([
      'id',
      'reads',
      'likes',
      'popularity',
    ])
  })

  test('Should have correct values for Direction', () => {
    expect(Object.values(Direction)).toStrictEqual([
      'asc',
      'desc',
    ])
  })
})
