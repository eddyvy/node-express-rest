import express from 'express'
import type NodeCache from 'node-cache'
import { getRouter } from '../../src/server/router'
import { start } from '../../src/server/server'

jest.mock('express')
jest.mock('../../src/server/router')

describe('Server', () => {
  // Mocks
  const mockListen = jest.fn()
  const mockUse = jest.fn()
  const mockSet = jest.fn();
  (express as unknown as jest.Mock).mockReturnValue(({
    use: mockUse,
    listen: mockListen,
    set: mockSet,
  }));
  (getRouter as unknown as jest.Mock).mockReturnValue('mockRouter')

  beforeEach(() => { jest.clearAllMocks() })

  test('Should start the app and listen', () => {
    start('mockCache' as unknown as NodeCache)
    expect(express).toHaveBeenCalledTimes(1)
    expect(express).toHaveBeenCalledWith()
    expect(mockListen).toHaveBeenCalledTimes(1)
    expect(mockListen).toHaveBeenCalledWith(3000, expect.any(Function))
  })

  test('Should use the router', () => {
    start('mockCache' as unknown as NodeCache)
    expect(getRouter).toHaveBeenCalledTimes(1)
    expect(getRouter).toHaveBeenCalledWith()
    expect(mockUse).toHaveBeenCalledTimes(1)
    expect(mockUse).toHaveBeenCalledWith('/api', 'mockRouter')
  })

  test('Should set the cache', () => {
    start('mockCache' as unknown as NodeCache)
    expect(mockSet).toHaveBeenCalledTimes(1)
    expect(mockSet).toHaveBeenCalledWith('cache', 'mockCache')
  })
})
