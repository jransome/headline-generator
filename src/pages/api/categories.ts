import type { NextApiRequest, NextApiResponse } from 'next'
import { Category } from '../../models'

type ResponseObject = {
  message?: string,
  categories?: Category.ICategory[],
}

const validateUpsertBody = (newCategories: Category.ICategory[]): boolean =>
  !Array.isArray(newCategories) ||
  newCategories.some(category =>
    !!category.name &&
    Array.isArray(category.phrases) &&
    category.phrases.every(p => typeof p === 'string')
  )

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseObject>
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const categories = await Category.findAll()
        res.status(200).send({ categories })
      } catch (error) {
        res.status(500).send({ message: String(error) })
      }
      break
    case 'PUT':
      try {
        const updates = JSON.parse(body)
        if (!validateUpsertBody(updates)) {
          return res.status(400).send({ message: 'invalid body' })
        }
        await Category.upsertManyByName(JSON.parse(body))
        res.status(201).send({ message: 'upserted' })
      } catch (error) {
        res.status(500).send({ message: String(error) })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).send({ message: `Method ${method} not allowed` })
  }
}
