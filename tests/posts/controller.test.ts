import { Request, Response } from 'express'
import { postsController } from '../../src/posts/controller'
import { httpError } from '../../src/server/error'
import { validatePostRequest } from '../../src/posts/validate'
import { getPosts } from '../../src/posts/service'
import { getCachedPosts, setCachedPosts } from '../../src/posts/cache'

jest.mock('../../src/server/error')
jest.mock('../../src/posts/validate')
jest.mock('../../src/posts/service')
jest.mock('../../src/posts/cache')

describe('Posts Controller', () => {
  // Mocks
  const mockGet = jest.fn().mockReturnValue('mockCache')
  const mockReq = {
    app: { get: mockGet },
  } as unknown as Request
  const mockRes = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response

  beforeEach(() => { jest.clearAllMocks() })

  test('Should response with status 200', async() => {
    await postsController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(httpError).not.toHaveBeenCalled()
  })

  test('Should response with the posts', async() => {
    (getPosts as unknown as jest.Mock).mockReturnValue('mockPosts')

    await postsController(mockReq, mockRes)

    expect(mockRes.json).toHaveBeenCalledTimes(1)
    expect(mockRes.json).toHaveBeenCalledWith('mockPosts')
    expect(httpError).not.toHaveBeenCalled()
  })

  test('Should validate the request', async() => {
    await postsController(mockReq, mockRes)

    expect(validatePostRequest).toHaveBeenCalledTimes(1)
    expect(validatePostRequest).toHaveBeenCalledWith(mockReq)
  })

  test('Should call the posts service with correct parameters', async() => {
    (validatePostRequest as unknown as jest.Mock).mockReturnValue('mockData')

    await postsController(mockReq, mockRes)

    expect(getPosts).toHaveBeenCalledTimes(1)
    expect(getPosts).toHaveBeenCalledWith('mockData')
  })

  test('Should call httpError if error is thrown', async() => {
    const testError = new Error();
    (validatePostRequest as unknown as jest.Mock).mockImplementation(() => {
      throw testError
    })

    await postsController(mockReq, mockRes)

    expect(httpError).toHaveBeenCalledTimes(1)
    expect(httpError).toHaveBeenCalledWith(testError, mockRes)
  })

  test('Should use cached posts when provided', async() => {
    (validatePostRequest as unknown as jest.Mock).mockReturnValue('mockData');
    (getCachedPosts as unknown as jest.Mock).mockReturnValue('cachedPosts')

    await postsController(mockReq, mockRes)

    expect(mockGet).toHaveBeenCalledTimes(1)
    expect(mockGet).toHaveBeenCalledWith('cache')
    expect(getCachedPosts).toHaveBeenCalledTimes(1)
    expect(getCachedPosts).toHaveBeenCalledWith('mockData', 'mockCache')
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledTimes(1)
    expect(mockRes.json).toHaveBeenCalledWith('cachedPosts')
    expect(setCachedPosts).not.toHaveBeenCalled()
  })

  test('Should set posts into cache correctly', async() => {
    (validatePostRequest as unknown as jest.Mock).mockReturnValue('mockData');
    (getCachedPosts as unknown as jest.Mock).mockReturnValue(null);
    (getPosts as unknown as jest.Mock).mockReturnValue('mockPosts')

    await postsController(mockReq, mockRes)

    expect(setCachedPosts).toHaveBeenCalledTimes(1)
    expect(setCachedPosts).toHaveBeenCalledWith('mockData', 'mockCache', 'mockPosts')
  })

})
