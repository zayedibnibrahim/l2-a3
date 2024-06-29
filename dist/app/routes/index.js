"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_route_1 = require("../modules/category/category.route");
const course_route_1 = require("../modules/course/course.route");
const review_route_1 = require("../modules/review/review.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/categories',
        route: category_route_1.categoryRoutes,
    },
    {
        path: '/courses',
        route: course_route_1.courseRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.reviewRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
