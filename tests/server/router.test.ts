import { Router } from 'express'
import { getRouter, routes } from '../../src/server/router'
import { pingController } from '../../src/ping/controller'

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
    })
  })

  test('Should have the correct amount of endpoints and methods and return the router', () => {
    const router = getRouter()

    expect(mockGet).toHaveBeenCalledTimes(1)
    expect(router).toStrictEqual({
      get: mockGet,
    })
  })

  test('Should exist ping route called with ping controller', () => {
    getRouter()

    expect(mockGet).toHaveBeenCalled()
    expect(mockGet).toHaveBeenCalledWith('/ping', pingController)
  })
})
