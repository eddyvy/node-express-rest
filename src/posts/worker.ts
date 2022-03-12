import { isMainThread, parentPort, workerData } from 'worker_threads'
import type { Post } from './types'
import { fetchPosts } from './service'

export const fileName = __filename

if (!isMainThread && parentPort) {
  // Receive the messages port channel
  parentPort.once('message', ({ port1 }) => {
    // Call the external API
    fetchPosts(workerData)
      .then((data: Post[]) => {
        // Send via the port channel
        port1.postMessage(data)
      })
      .finally(() => process.exit())
  })
}
