import { config } from 'dotenv'
import NodeCache from 'node-cache'
import { start } from '../src/server/server'

jest.mock('dotenv')
jest.mock('node-cache')
jest.mock('../src/server/server')

describe('Index', () => {
  import('../src/index')

  test('Should apply the config and the start server', () => {
    expect(config).toHaveBeenCalledTimes(1)
    expect(config).toHaveBeenCalledWith()
    expect(start).toHaveBeenCalledTimes(1)
    expect(start).toHaveBeenCalledWith(expect.any(NodeCache))
  })

  test('Should start the cache', () => {
    expect(NodeCache).toHaveBeenCalledTimes(1)
    expect(NodeCache).toHaveBeenCalledWith({ stdTTL: 600 })
  })
})
