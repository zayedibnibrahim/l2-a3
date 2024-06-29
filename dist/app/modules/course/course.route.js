"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_validation_1 = require("./course.validation");
const course_controller_1 = require("./course.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(course_validation_1.courseValidation.createCourseValidationSchema), course_controller_1.courseControllers.createCourse);
router.get('/', course_controller_1.courseControllers.getAllCourse);
router.get('/best', course_controller_1.courseControllers.getBestCourse);
router.get('/:courseId', course_controller_1.courseControllers.getSingleCourse);
router.put('/:courseId', (0, validateRequest_1.default)(course_validation_1.courseValidation.updateCourseValidationSchema), course_controller_1.courseControllers.updateCourse);
router.get('/:courseId/reviews', course_controller_1.courseControllers.getCourseReview);
router.delete('/:courseId', course_controller_1.courseControllers.deleteCourse);
exports.courseRoutes = router;
