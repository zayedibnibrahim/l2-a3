"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidation = void 0;
const zod_1 = require("zod");
const createTagSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Tag name is required' }),
});
const createDetailsSchema = zod_1.z.object({
    level: zod_1.z.string().min(1, { message: 'Level is required' }),
    description: zod_1.z.string().min(1, { message: 'Description is required' }),
});
const createCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, { message: 'Title is required' }),
        instructor: zod_1.z.string().min(1, 'Instructor is required'),
        categoryId: zod_1.z.string().min(1, 'Category id is required'),
        price: zod_1.z
            .number({
            required_error: 'Price is required',
            invalid_type_error: 'Price must be a Number',
        })
            .min(0, { message: 'Must be 5 or more characters long' }),
        tags: zod_1.z.array(createTagSchema),
        startDate: zod_1.z.string().min(1, { message: 'Start date is required' }),
        endDate: zod_1.z.string().min(1, { message: 'End date is required' }),
        language: zod_1.z.string().min(1, { message: 'Language is required' }),
        provider: zod_1.z.string().min(1, { message: 'Provider is required' }),
        details: createDetailsSchema,
    }),
});
const updateTagSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
});
const updateDetailsSchema = zod_1.z.object({
    level: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
});
const updateCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        instructor: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        tags: zod_1.z.array(updateTagSchema).optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        language: zod_1.z.string().optional(),
        provider: zod_1.z.string().optional(),
        details: updateDetailsSchema.optional(),
    }),
});
exports.courseValidation = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
};
