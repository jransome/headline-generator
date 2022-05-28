import mongoose from 'mongoose'

const COLLECTION_NAME = 'categories'

const dropCategories = async () => {
  const db = await mongoose.connect(process.env.MONGODB_URI!)
  const result = await db.connection.dropCollection(COLLECTION_NAME)
  console.log('Deleted', COLLECTION_NAME, result)
  db.disconnect()
}

dropCategories()
