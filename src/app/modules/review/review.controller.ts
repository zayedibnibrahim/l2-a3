import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { reviewServices } from './review.service'

const createReview = catchAsync(async (req, res) => {
  const result = await reviewServices.createReviewIntoDB(req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review is created successfully',
    data: result,
  })
})

export const reviewControllers = {
  createReview,
}
