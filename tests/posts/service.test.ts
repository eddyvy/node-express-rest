import axios from 'axios'
import { MessageChannel, Worker } from 'worker_threads'
import { fetchPosts, getPosts } from '../../src/posts/service'
import { Direction, Post, SortBy, ValidPostData } from '../../src/posts/types'

jest.mock('axios')
jest.mock('worker_threads')

describe('Posts Service', () => {
  // Test Data
  const testValidData: ValidPostData = {
    tags: [ 'tag1', 'tag2', 'tag3' ],
    sortBy: SortBy.likes,
    direction: Direction.desc,
  }
  const testPosts: Post[] = [
    {
      'author': 'Trevon Rodriguez',
      'authorId': 5,
      'id': 93,
      'likes': 881,
      'popularity': 0.41,
      'reads': 73964,
      'tags': [
        'tech',
        'history',
      ],
    },
    {
      'author': 'Lainey Ritter',
      'authorId': 1,
      'id': 80,
      'likes': 874,
      'popularity': 0.47,
      'reads': 9002,
      'tags': [
        'politics',
        'history',
      ],
    },
    {
      'author': 'Trevon Rodriguez',
      'authorId': 5,
      'id': 93,
      'likes': 881,
      'popularity': 0.41,
      'reads': 73964,
      'tags': [
        'tech',
        'history',
      ],
    },
    {
      'author': 'Lainey Ritter',
      'authorId': 1,
      'id': 80,
      'likes': 874,
      'popularity': 0.47,
      'reads': 9002,
      'tags': [
        'politics',
        'history',
      ],
    },
    {
      'author': 'Zackery Turner',
      'authorId': 12,
      'id': 24,
      'likes': 940,
      'popularity': 0.74,
      'reads': 89299,
      'tags': [
        'culture',
        'tech',
        'politics',
      ],
    },
    {
      'author': 'Trevon Rodriguez',
      'authorId': 5,
      'id': 67,
      'likes': 903,
      'popularity': 0.71,
      'reads': 26815,
      'tags': [
        'health',
        'history',
      ],
    },
    {
      'author': 'Trevon Rodriguez',
      'authorId': 5,
      'id': 67,
      'likes': 903,
      'popularity': 0.71,
      'reads': 26815,
      'tags': [
        'health',
        'history',
      ],
    },
    {
      'author': 'Zackery Turner',
      'authorId': 12,
      'id': 50,
      'likes': 898,
      'popularity': 0.96,
      'reads': 4923,
      'tags': [
        'health',
        'history',
      ],
    },
    {
      'author': 'Zackery Turner',
      'authorId': 12,
      'id': 24,
      'likes': 940,
      'popularity': 0.74,
      'reads': 89299,
      'tags': [
        'culture',
        'tech',
        'politics',
      ],
    },
    {
      'author': 'Trevon Rodriguez',
      'authorId': 5,
      'id': 67,
      'likes': 903,
      'popularity': 0.71,
      'reads': 26815,
      'tags': [
        'health',
        'history',
      ],
    },
    {
      'author': 'Trevon Rodriguez',
      'authorId': 5,
      'id': 67,
      'likes': 903,
      'popularity': 0.71,
      'reads': 26815,
      'tags': [
        'health',
        'history',
      ],
    },
    {
      'author': 'Zackery Turner',
      'authorId': 12,
      'id': 50,
      'likes': 898,
      'popularity': 0.96,
      'reads': 4923,
      'tags': [
        'health',
        'history',
      ],
    },
  ]
  const postsOrderedAndFiltered: Post[] = [
    {
      'author': 'Zackery Turner',
      'authorId': 12,
      'id': 24,
      'likes': 940,
      'popularity': 0.74,
      'reads': 89299,
      'tags': [
        'culture',
        'tech',
        'politics',
      ],
    },
    {
      'author': 'Trevon Rodriguez',
      'authorId': 5,
      'id': 67,
      'likes': 903,
      'popularity': 0.71,
      'reads': 26815,
      'tags': [
        'health',
        'history',
      ],
    },
    {
      'author': 'Zackery Turner',
      'authorId': 12,
      'id': 50,
      'likes': 898,
      'popularity': 0.96,
      'reads': 4923,
      'tags': [
        'health',
        'history',
      ],
    },
    {
      'author': 'Trevon Rodriguez',
      'authorId': 5,
      'id': 93,
      'likes': 881,
      'popularity': 0.41,
      'reads': 73964,
      'tags': [
        'tech',
        'history',
      ],
    },
    {
      'author': 'Lainey Ritter',
      'authorId': 1,
      'id': 80,
      'likes': 874,
      'popularity': 0.47,
      'reads': 9002,
      'tags': [
        'politics',
        'history',
      ],
    },
  ]

  // Mocks
  const mockPostMsg = jest.fn()
  const mockOn = jest.fn().mockImplementation((msg, fun) => {
    fun(testPosts)
  });
  (MessageChannel as unknown as jest.Mock).mockReturnValue({ port1: 'port1', port2: { on: mockOn } });
  (Worker as unknown as jest.Mock).mockReturnValue({ postMessage: mockPostMsg })

  beforeEach(() => { jest.clearAllMocks() })

  test('fetchPosts should work correctly', async() => {
    axios.get = jest.fn().mockReturnValue({ data: { posts: 'testPosts' } })
    const posts = await fetchPosts('testTag')
    expect(posts).toBe('testPosts')
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('https://api.hatchways.io/assessment/blog/posts?tag=testTag')
  })

  test('getPosts should create one Worker and Channel by Tag with correct params', async() => {
    await getPosts(testValidData)
    expect(MessageChannel).toHaveBeenCalledTimes(3)
    expect(MessageChannel).toHaveBeenNthCalledWith(1)
    expect(MessageChannel).toHaveBeenNthCalledWith(2)
    expect(MessageChannel).toHaveBeenNthCalledWith(3)
    expect(Worker).toHaveBeenCalledTimes(3)
    expect(Worker).toHaveBeenNthCalledWith(1, expect.any(String), { workerData: 'tag1' })
    expect(Worker).toHaveBeenNthCalledWith(2, expect.any(String), { workerData: 'tag2' })
    expect(Worker).toHaveBeenNthCalledWith(3, expect.any(String), { workerData: 'tag3' })
  })

  test('getPosts should send the channel to the workers', async() => {
    await getPosts(testValidData)
    expect(mockPostMsg).toHaveBeenCalledTimes(3)
    expect(mockPostMsg).toHaveBeenNthCalledWith(1, { port1: 'port1' }, [ 'port1' ])
    expect(mockPostMsg).toHaveBeenNthCalledWith(2, { port1: 'port1' }, [ 'port1' ])
    expect(mockPostMsg).toHaveBeenNthCalledWith(3, { port1: 'port1' }, [ 'port1' ])
  })

  test('getPosts should wait the workers data', async() => {
    await getPosts(testValidData)
    expect(mockOn).toHaveBeenCalledTimes(3)
    expect(mockOn).toHaveBeenNthCalledWith(1, 'message', expect.any(Function))
    expect(mockOn).toHaveBeenNthCalledWith(2, 'message', expect.any(Function))
    expect(mockOn).toHaveBeenNthCalledWith(3, 'message', expect.any(Function))
  })

  test('getPosts should return the data filtered and ordered', async() => {
    const posts = await getPosts(testValidData)
    expect(posts).toEqual(postsOrderedAndFiltered)
  })
})
