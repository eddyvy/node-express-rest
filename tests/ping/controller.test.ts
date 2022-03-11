import type { Request, Response } from 'express'
import { pingController } from '../../src/ping/controller'

describe('Ping Controller', () => {
  // Mocks
  const mockReq = {} as unknown as Request
  const mockRes = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response

  beforeEach(() => { jest.clearAllMocks() })

  test('Should send status 200', () => {
    pingController(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(200)
  })

  test('Should send the correct response', () => {
    pingController(mockReq, mockRes)

    expect(mockRes.json).toHaveBeenCalledTimes(1)
    expect(mockRes.json).toHaveBeenCalledWith({ success: true })
  })
})
