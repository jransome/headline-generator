import mongoose from 'mongoose'

export interface ICategory {
  name: string;
  words: string[];
}

/**
 * 1) adding { strict: 'throw' } as a 2nd arg will force errors to be thrown when encountering additional properties
 * 2) it seems that mongoose will cast input to the expected data type. eg. words: "hi" --> words: ["hi"]
 */
const categorySchema = new mongoose.Schema<ICategory>({
  name: { type: String, required: true },
  words: { type: [String], required: true }
})

const Category: mongoose.Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema)

export const findAll = () => Category.find({}, { _id: 0, __v: 0 }).then(docs => docs.map(d => d.toJSON()))

export const upsertByName = (newCategory: ICategory) => Category.findOneAndUpdate({ name: newCategory.name }, newCategory, { upsert: true })
