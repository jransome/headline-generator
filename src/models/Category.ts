import mongoose from 'mongoose'

export interface ICategory {
  name: string;
  phrases: string[];
}

/**
 * 1) adding { strict: 'throw' } as a 2nd arg will force errors to be thrown when encountering additional properties
 * 2) it seems that mongoose will cast input to the expected data type. eg. phrases: "hi" --> phrases: ["hi"]
 */
const categorySchema = new mongoose.Schema<ICategory>({
  name: { type: String, required: true },
  phrases: { type: [String], required: true },
})

const Category: mongoose.Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema)

export const findAll = () => Category.find({}, { _id: 0, __v: 0 }).then(docs => docs.map(d => d.toJSON()))

export const upsertManyByName = (newCategories: ICategory[]) => Category.bulkWrite(
  newCategories.map(category => ({
    updateOne: {
      filter: { name: category.name },
      update: category,
      upsert: true,
    },
  })))
