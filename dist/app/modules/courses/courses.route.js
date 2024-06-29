"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const courses_validation_1 = require("./courses.validation");
const courses_controller_1 = require("./courses.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(courses_validation_1.courseValidation.createCourseValidationSchema), courses_controller_1.courseControllers.createCourse);
router.get('/', courses_controller_1.courseControllers.getAllCourse);
router.get('/:courseId', courses_controller_1.courseControllers.getSingleCourse);
router.put('/:courseId', (0, validateRequest_1.default)(courses_validation_1.courseValidation.updateCourseValidationSchema), courses_controller_1.courseControllers.updateCourse);
router.get('/:courseId/reviews', courses_controller_1.courseControllers.getCourseReview);
router.delete('/:courseId', courses_controller_1.courseControllers.deleteCourse);
exports.courseRoutes = router;
