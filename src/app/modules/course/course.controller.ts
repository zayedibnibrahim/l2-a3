import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { bestCourseServices } from './course.service'

const getBestCourse = catchAsync(async (req, res) => {
  const result = await bestCourseServices.getBestCourseFromDB()

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Best course fetched successfully',
    data: result,
  })
})

export const bestCourseControllers = {
  getBestCourse,
}
