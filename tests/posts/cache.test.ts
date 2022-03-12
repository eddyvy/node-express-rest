import type NodeCache from 'node-cache'
import { Direction, Post, SortBy, ValidPostData } from '../../src/posts/types'
import { getCachedPosts, setCachedPosts } from '../../src/posts/cache'

describe('Posts Cache', () => {
  const testValidPostData: ValidPostData = {
    tags: [ 'tag1', 'tag2' ],
    sortBy: SortBy.id,
    direction: Direction.asc,
  }

  test('getCachedPosts should return cached posts if posts in cache', () => {
    const mockCache = {
      get: jest.fn().mockReturnValue('cachedPosts'),
    } as unknown as NodeCache

    const cachedPosts = getCachedPosts(testValidPostData, mockCache)

    expect(mockCache.get).toHaveBeenCalledTimes(1)
    expect(mockCache.get).toHaveBeenCalledWith(JSON.stringify(testValidPostData))
    expect(cachedPosts).toBe('cachedPosts')
  })

  test('getCachedPosts should return null if no posts in cache', () => {
    const mockCache = {
      get: jest.fn().mockReturnValue(undefined),
    } as unknown as NodeCache

    const cachedPosts = getCachedPosts(testValidPostData, mockCache)

    expect(mockCache.get).toHaveBeenCalledTimes(1)
    expect(mockCache.get).toHaveBeenCalledWith(JSON.stringify(testValidPostData))
    expect(cachedPosts).toBe(null)
  })

  test('setCachedPosts should be called with correct arguments', () => {
    const mockCache = {
      set: jest.fn(),
    } as unknown as NodeCache
    const testPosts = 'testPost' as unknown as Post[]

    setCachedPosts(testValidPostData, mockCache, testPosts)

    expect(mockCache.set).toHaveBeenCalledTimes(1)
    expect(mockCache.set).toHaveBeenCalledWith(JSON.stringify(testValidPostData), testPosts, 300)
  })
})
