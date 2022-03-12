import { config } from 'dotenv'
import NodeCache from 'node-cache'
import { start } from './server/server'

config()
start(new NodeCache({ stdTTL: 600 }))
