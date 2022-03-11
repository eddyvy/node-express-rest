import { config } from 'dotenv'
import { start } from '../src/server/server'

jest.mock('dotenv')
jest.mock('@/server/server')

describe('Index', () => {
  import('../src/index')

  test('Should apply the config and the start server', () => {
    expect(config).toHaveBeenCalledTimes(1)
    expect(config).toHaveBeenCalledWith()
    expect(start).toHaveBeenCalledTimes(1)
    expect(start).toHaveBeenCalledWith()
  })
})
