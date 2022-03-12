import { MessageChannel, Worker } from 'worker_threads'
import axios from 'axios'
import type { Post, ValidPostData } from './types'
import { fileName } from './worker'

// asc => min to max; desc => max to min
const asc = (a: number, b: number) => a - b
const desc = (a: number, b: number) => b - a

export const fetchPosts = async(tag: string): Promise<Post[]> => {
  const response = await axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`)
  return response.data.posts as Post[]
}

export const getPosts = async({ tags, sortBy, direction }: ValidPostData): Promise<Post[]> => {
  const retrievedPosts: Post[] = []
  const workerPool: { [p: string]: { channel: MessageChannel, worker: Worker } } = {}

  for (const tagIdx in tags) {
    const tag = tags[tagIdx]
    const channel = new MessageChannel()
    const worker = new Worker(fileName, {
      workerData: tag,
    })
    // Send the port channel to the worker
    worker.postMessage({ port1: channel.port1 }, [ channel.port1 ])
    // Save channel and worker in the worker pool
    workerPool[tagIdx] = { channel, worker }
  }

  for (const workerIdx in workerPool) {
    await new Promise<Post[]>((resolve) => {
      workerPool[workerIdx].channel.port2.on('message', (data: Post[]) => {
        retrievedPosts.push(...data)
        resolve(data)
      })
    })
  }

  const postIds = retrievedPosts.map((post) => post.id)

  const filteredPosts = retrievedPosts.filter((post, idx) => {
    // If repeated, last of the repeated posts in the array will be true
    return !postIds.slice(idx + 1).includes(post.id)
  })

  return direction === 'asc'
    ? filteredPosts.sort((postA, postB) => asc(postA[sortBy], postB[sortBy]))
    : filteredPosts.sort((postA, postB) => desc(postA[sortBy], postB[sortBy]))
}
