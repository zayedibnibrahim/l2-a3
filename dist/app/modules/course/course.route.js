"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bestCourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("./course.controller");
const router = express_1.default.Router();
router.get('/best', course_controller_1.bestCourseControllers.getBestCourse);
exports.bestCourseRoutes = router;
