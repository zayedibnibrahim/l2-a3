import { z } from 'zod'

const createTagSchema = z.object({
  name: z.string().min(1, { message: 'Tag name is required' }),
})

const createDetailsSchema = z.object({
  level: z.string().min(1, { message: 'Level is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
})

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    instructor: z.string().min(1, 'Instructor is required'),
    categoryId: z.string().min(1, 'Category id is required'),
    price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a Number',
      })
      .min(0, { message: 'Must be 5 or more characters long' }),
    tags: z.array(createTagSchema),
    startDate: z.string().min(1, { message: 'Start date is required' }),
    endDate: z.string().min(1, { message: 'End date is required' }),
    language: z.string().min(1, { message: 'Language is required' }),
    provider: z.string().min(1, { message: 'Provider is required' }),
    details: createDetailsSchema,
  }),
})

const updateTagSchema = z.object({
  name: z.string().optional(),
})

const updateDetailsSchema = z.object({
  level: z.string().optional(),
  description: z.string().optional(),
})

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(updateTagSchema).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: updateDetailsSchema.optional(),
  }),
})

export const courseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
}
