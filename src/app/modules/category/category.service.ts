import { TCategory } from './category.interface'
import { Category } from './category.model'

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload)
  return result
}

const getAllCategoryFromDB = async () => {
  const result = await Category.find()
  return result
}

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id)
  return result
}

const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<TCategory>,
) => {
  const result = await Category.findByIdAndUpdate(id, payload)
  return result
}

const deleteCategoryIntoDB = async (id: string) => {
  const result = await Category.findByIdAndDelete(id)
  return result
}

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryIntoDB,
}
