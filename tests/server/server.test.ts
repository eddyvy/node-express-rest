import express from 'express'
import { start } from '../../src/server/server'

jest.mock('express')

describe('Server', () => {
  const mockListen = jest.fn();
  (express as unknown as jest.Mock).mockReturnValue(({
    get: jest.fn(),
    listen: mockListen,
  }))

  test('Should start the app and listen', () => {
    start()
    expect(express).toHaveBeenCalledTimes(1)
    expect(express).toHaveBeenCalledWith()
    expect(mockListen).toHaveBeenCalledTimes(1)
    expect(mockListen).toHaveBeenCalledWith(3000, expect.any(Function))
  })
})
