import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { categoryServices } from './category.service'

const createCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.createCategoryIntoDB(req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category is created successfully',
    data: result,
  })
})

const getAllCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategoryFromDB()

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category are retrieved successfully',
    data: result,
  })
})

const getSingleCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params
  const result = await categoryServices.getSingleCategoryFromDB(categoryId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category is retrieved successfully',
    data: result,
  })
})

const updateCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params
  const result = await categoryServices.updateCategoryIntoDB(
    categoryId,
    req.body,
  )

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category is updated successfully',
    data: result,
  })
})

const deleteCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params
  const result = await categoryServices.deleteCategoryIntoDB(categoryId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category is deleted successfully',
    data: result,
  })
})

export const categoryControllers = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
}
