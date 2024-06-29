"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidation = void 0;
const zod_1 = require("zod");
const reviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: zod_1.z.string().min(1),
        rating: zod_1.z.number().min(1).max(5),
        review: zod_1.z.string().min(1),
    }),
});
exports.reviewValidation = {
    reviewValidationSchema,
};
