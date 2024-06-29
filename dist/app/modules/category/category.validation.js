"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const zod_1 = require("zod");
const createCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: 'Category name is required' }),
    }),
});
const updateCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
    }),
});
exports.categoryValidation = {
    createCategoryValidationSchema,
    updateCategoryValidationSchema,
};
