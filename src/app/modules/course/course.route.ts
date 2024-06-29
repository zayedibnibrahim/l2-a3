import express from 'express'
import { bestCourseControllers } from './course.controller'

const router = express.Router()

router.get('/best', bestCourseControllers.getBestCourse)

export const bestCourseRoutes = router
