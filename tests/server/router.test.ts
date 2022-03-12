import { Router } from 'express'
import { getRouter, routes } from '../../src/server/router'
import { pingController } from '../../src/ping/controller'
import { postsController } from '../../src/posts/controller'

jest.mock('express')

describe('Router', () => {
  // Mocks
  const mockGet = jest.fn();
  (Router as unknown as jest.Mock).mockReturnValue(({
    get: mockGet,
  }))

  beforeEach(() => { jest.clearAllMocks() })

  test('Routes should be correct', () => {
    expect(routes).toStrictEqual({
      ping: '/ping',
      posts: '/posts',
    })
  })

  test('Should have the correct amount of endpoints and methods and return the router', () => {
    const router = getRouter()

    expect(mockGet).toHaveBeenCalledTimes(2)
    expect(router).toStrictEqual({
      get: mockGet,
    })
  })

  test('Should exist ping route called with ping controller', () => {
    getRouter()
    expect(mockGet).toHaveBeenCalledWith('/ping', pingController)
  })

  test('Should exist posts route called with posts controller', () => {
    getRouter()
    expect(mockGet).toHaveBeenCalledWith('/posts', postsController)
  })
})
