/**
 * loads csv file containing phrases as columns (headed by category names) into the database
 */
import fs from 'fs'
import { parse } from 'csv-parse/sync'
import mongoose from 'mongoose'

const COLLECTION_NAME = 'categories'
const CSV_FILE_NAME = `${__dirname}/headline-categories.csv`

const seedCategories = async () => {
  const pendingConnection = mongoose.connect(process.env.MONGODB_URI!)

  const rows: Array<any> = parse(
    fs.readFileSync(CSV_FILE_NAME).toString().trim(),
    { columns: true },
  )
  const categoryNames = Object.keys(rows[0])

  const categoryDocuments = categoryNames.map(name => ({
    name,
    phrases: rows.map(r => r[name]).filter(phrase => phrase.length > 0)
  }))

  const db = await pendingConnection
  const categoriesCollection = await db.connection.createCollection(COLLECTION_NAME)
  const result = await categoriesCollection.insertMany(categoryDocuments)
  console.log('Database seeded', result)
  db.disconnect()
}

seedCategories()
