"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_route_1 = require("../modules/category/category.route");
const courses_route_1 = require("../modules/courses/courses.route");
const review_route_1 = require("../modules/review/review.route");
const course_route_1 = require("../modules/course/course.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/categories',
        route: category_route_1.categoryRoutes,
    },
    {
        path: '/courses',
        route: courses_route_1.courseRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.reviewRoutes,
    },
    {
        path: '/course',
        route: course_route_1.bestCourseRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
