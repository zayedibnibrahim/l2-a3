import { Router } from 'express'
import { categoryRoutes } from '../modules/category/category.route'
import { courseRoutes } from '../modules/courses/courses.route'
import { reviewRoutes } from '../modules/review/review.route'
import { bestCourseRoutes } from '../modules/course/course.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/courses',
    route: courseRoutes,
  },
  {
    path: '/reviews',
    route: reviewRoutes,
  },
  {
    path: '/course',
    route: bestCourseRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
