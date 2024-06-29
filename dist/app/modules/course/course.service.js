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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const course_model_1 = require("./course.model");
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const review_model_1 = require("../review/review.model");
const createCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.create(payload);
    return result;
});
const getAllCourseFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.Course.find(), query)
        .paginate()
        .sort()
        .filter()
        .priceRangeFilter()
        .filterTag();
    const result = yield courseQuery.modelQuery;
    const count = yield course_model_1.Course.countDocuments({});
    const meta = {
        page: Number(query === null || query === void 0 ? void 0 : query.page) || 1,
        limit: Number(query === null || query === void 0 ? void 0 : query.limit) || 10,
        total: Number(count),
    };
    const allData = { result, meta };
    return allData;
});
const getSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findById(id);
    return result;
});
const updateCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    const { tags, details } = payload, remainingCourseData = __rest(payload, ["tags", "details"]);
    const modifiedUpdatedData = Object.assign({}, remainingCourseData);
    if (details && Object.keys(details).length) {
        for (const [key, value] of Object.entries(details)) {
            modifiedUpdatedData[`details.${key}`] = value;
        }
    }
    try {
        session.startTransaction();
        const updatedDataWithoutTags = yield course_model_1.Course.findByIdAndUpdate(id, modifiedUpdatedData, {
            new: true,
            runValidators: true,
            session,
        });
        if (!updatedDataWithoutTags) {
            throw new AppError_1.default(400, 'Failed to update course!(without tag)');
        }
        if (tags && tags.length > 0) {
            // filter out the deleted fields
            const deletedTags = tags
                .filter((el) => el.name && el.isDeleted)
                .map((el) => el.name);
            const deleteTagsIntoDB = yield course_model_1.Course.findByIdAndUpdate(id, {
                $pull: {
                    tags: { name: { $in: deletedTags } },
                },
            }, {
                new: true,
                runValidators: true,
                session,
            });
            if (!deleteTagsIntoDB) {
                throw new AppError_1.default(400, 'Failed to update Tags!');
            }
            // filter out the new course fields
            const newTags = tags === null || tags === void 0 ? void 0 : tags.filter((el) => el.name && !el.isDeleted);
            const updateNewTags = yield course_model_1.Course.findByIdAndUpdate(id, {
                $addToSet: { tags: { $each: newTags } },
            }, {
                new: true,
                runValidators: true,
                session,
            });
            if (!updateNewTags) {
                throw new AppError_1.default(400, 'Failed to update new tags!');
            }
        }
        yield session.commitTransaction();
        yield session.endSession();
        const result = yield course_model_1.Course.findById(id);
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update course');
    }
});
const deleteCourseIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findByIdAndDelete(id);
    return result;
});
const getCourseReviewFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.Review.find({ courseId: id });
    if (review.length === 0) {
        throw new AppError_1.default(400, 'No review found for the course');
    }
    if (review.length) {
        const getCourse = yield course_model_1.Course.findById(id);
        const result = {
            course: getCourse,
            reviews: review,
        };
        return result;
    }
    else {
        throw new AppError_1.default(400, 'Course not found');
    }
});
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
    const bestCourse = yield course_model_1.Course.findById(groupReview[0]._id);
    const result = {
        course: bestCourse,
        averageRating: parseFloat(groupReview[0].averageRating.toFixed(1)),
        reviewCount: groupReview[0].numberOfRatings,
    };
    return result;
});
exports.courseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseIntoDB,
    getCourseReviewFromDB,
    getBestCourseFromDB,
};
