import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { courseServices } from './courses.service'

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is created successfully',
    data: result,
  })
})

const getAllCourse = catchAsync(async (req, res) => {
  const { result, meta } = await courseServices.getAllCourseFromDB(req.query)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course are retrieved successfully',
    meta: meta,
    data: result,
  })
})

const getSingleCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const result = await courseServices.getSingleCourseFromDB(courseId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  })
})

const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const result = await courseServices.updateCourseIntoDB(courseId, req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is updated successfully',
    data: result,
  })
})

const deleteCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const result = await courseServices.deleteCourseIntoDB(courseId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  })
})

const getCourseReview = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const result = await courseServices.getCourseReviewFromDB(courseId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course and review is fetched successfully',
    data: result,
  })
})

export const courseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getCourseReview,
}
