const MONGODB_URI = process.env.MONGODB_URI!
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable not set!')
}

export { MONGODB_URI }
