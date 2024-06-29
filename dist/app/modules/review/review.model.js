"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Review',
        required: [true, 'Review id is required'],
    },
    rating: { type: Number, required: [true, 'Ratting is required'] },
    review: { type: String, required: [true, 'Review is required'] },
});
exports.Review = (0, mongoose_1.model)('Review', reviewSchema);
