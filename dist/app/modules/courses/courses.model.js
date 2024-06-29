"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const tagSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
});
const courseSchema = new mongoose_1.Schema({
    title: { type: String, unique: true, required: true },
    instructor: { type: String, required: true },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category id is required'],
    },
    price: { type: Number, required: true },
    tags: [tagSchema],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: {
        level: { type: String, required: true },
        description: { type: String, required: true },
    },
}, {
    timestamps: true,
});
courseSchema.pre('save', function (next) {
    if (this.startDate && this.endDate) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        const durationInMilliseconds = end.getTime() - start.getTime();
        const durationInWeeks = durationInMilliseconds / (1000 * 60 * 60 * 24 * 7);
        this.durationInWeeks = Math.ceil(durationInWeeks);
    }
    else {
        this.durationInWeeks = undefined;
    }
    next();
});
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
