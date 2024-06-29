"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bestCourseServices = void 0;
const review_model_1 = require("../review/review.model");
const courses_model_1 = require("../courses/courses.model");
const getBestCourseFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const groupReview = yield review_model_1.Review.aggregate([
        {
            $group: {
                _id: '$courseId',
                averageRating: { $avg: '$rating' },
                numberOfRatings: { $sum: 1 },
            },
        },
        {
            $sort: { averageRating: -1 },
        },
        {
            $limit: 1,
        },
    ]);
    const bestCourse = yield courses_model_1.Course.findById(groupReview[0]._id);
    const result = {
        course: bestCourse,
        averageRating: parseFloat(groupReview[0].averageRating.toFixed(1)),
        reviewCount: groupReview[0].numberOfRatings,
    };
    return result;
});
exports.bestCourseServices = {
    getBestCourseFromDB,
};
