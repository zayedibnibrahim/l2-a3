import { z } from 'zod'

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Category name is required' }),
  }),
})

const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
})

export const categoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
}
