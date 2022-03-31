import mongoose from 'mongoose'
import { MONGODB_URI } from '../lib/config'

import * as Category from './Category'

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage. 
 * 
 * Adapted from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose
 */

// type the dbConnection property of global 
declare global {
  var dbConnection: Promise<typeof mongoose>
}

// queries are buffered by mongoose by default, so this does not need to be awaited
global.dbConnection ??= mongoose.connect(MONGODB_URI)

export { Category }
