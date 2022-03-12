import { Response } from 'express'
import { httpError } from '../../src/server/error'
import { InvalidDirectionError, InvalidSortByError, InvalidTagsError, NoTagsError } from '../../src/posts/error'

describe('Error handling', () => {
  // Mocks
  const mockRes = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response

  beforeEach(() => { jest.clearAllMocks() })

  test('Should throw internal server error with default error', () => {
    const testError = new Error()
    httpError(testError, mockRes)

    expect(mockRes.json).toHaveBeenCalledTimes(1)
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(500)
  })

  test('Should throw no tags error with status 400', () => {
    const testError = new NoTagsError()
    httpError(testError, mockRes)

    expect(mockRes.json).toHaveBeenCalledTimes(1)
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Tags parameter is required' })
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
  })

  test('Should throw invalid tags error with status 400', () => {
    const testError = new InvalidTagsError()
    httpError(testError, mockRes)

    expect(mockRes.json).toHaveBeenCalledTimes(1)
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'tags parameter is invalid' })
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
  })

  test('Should throw invalid sort by error with status 400', () => {
    const testError = new InvalidSortByError()
    httpError(testError, mockRes)

    expect(mockRes.json).toHaveBeenCalledTimes(1)
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'sortBy parameter is invalid' })
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
  })

  test('Should throw invalid direction error with status 400', () => {
    const testError = new InvalidDirectionError()
    httpError(testError, mockRes)

    expect(mockRes.json).toHaveBeenCalledTimes(1)
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'direction parameter is invalid' })
    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(400)
  })
})
