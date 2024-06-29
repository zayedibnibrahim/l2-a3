import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { courseValidation } from './course.validation'
import { courseControllers } from './course.controller'

const router = express.Router()

router.post(
  '/',
  validateRequest(courseValidation.createCourseValidationSchema),
  courseControllers.createCourse,
)

router.get('/', courseControllers.getAllCourse)
router.get('/best', courseControllers.getBestCourse)

router.get('/:courseId', courseControllers.getSingleCourse)

router.put(
  '/:courseId',
  validateRequest(courseValidation.updateCourseValidationSchema),
  courseControllers.updateCourse,
)

router.get('/:courseId/reviews', courseControllers.getCourseReview)

router.delete('/:courseId', courseControllers.deleteCourse)
export const courseRoutes = router
