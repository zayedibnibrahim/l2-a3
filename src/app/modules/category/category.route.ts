import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { categoryControllers } from './category.controller'
import { categoryValidation } from './category.validation'

const router = express.Router()

router.post(
  '/',
  validateRequest(categoryValidation.createCategoryValidationSchema),
  categoryControllers.createCategory,
)
router.get('/', categoryControllers.getAllCategory)

router.get('/:categoryId', categoryControllers.getSingleCategory)

router.patch(
  '/:categoryId',
  validateRequest(categoryValidation.updateCategoryValidationSchema),
  categoryControllers.updateCategory,
)

router.delete('/:categoryId', categoryControllers.deleteCategory)

export const categoryRoutes = router
