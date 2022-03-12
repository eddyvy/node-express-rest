import { isMainThread, parentPort, workerData } from 'worker_threads'
import { fetchPosts } from '../../src/posts/service'

jest.mock('worker_threads')
jest.mock('../../src/posts/service')

describe('Posts worker', () => {
  // Mocks
  const mockPort = { postMessage: jest.fn() }
  const mockOnce = jest.fn().mockImplementation((any, fun) => {
    fun({ port1: mockPort })
  });
  (process as unknown) = { exit: jest.fn() };
  (parentPort as unknown) = { once: mockOnce };
  (isMainThread as boolean) = false;
  (workerData as string) = 'testTag';
  (fetchPosts as jest.Mock).mockReturnValue(Promise.resolve('testPosts'))

  test('Should work correctly', async() => {
    await import('../../src/posts/worker')
    // Should call "once"
    expect(mockOnce).toHaveBeenCalledTimes(1)
    expect(mockOnce).toHaveBeenCalledWith('message', expect.any(Function))
    // Should call fetchPosts
    expect(fetchPosts).toHaveBeenCalledTimes(1)
    expect(fetchPosts).toHaveBeenCalledWith('testTag')
    // Should send the correct data
    expect(mockPort.postMessage).toHaveBeenCalledTimes(1)
    expect(mockPort.postMessage).toHaveBeenCalledWith('testPosts')
  })

})
