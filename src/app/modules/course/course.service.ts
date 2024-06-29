import { TCourse } from '../courses/courses.interface'

import { Review } from '../review/review.model'
import { Course } from '../courses/courses.model'

const getBestCourseFromDB = async () => {
  const groupReview = await Review.aggregate([
    {
      $group: {
        _id: '$courseId',
        averageRating: { $avg: '$rating' },
        numberOfRatings: { $sum: 1 },
      },
    },
    {
      $sort: { averageRating: -1 },
    },
    {
      $limit: 1,
    },
  ])

  const bestCourse = await Course.findById(groupReview[0]._id)

  const result = {
    course: bestCourse as TCourse,
    averageRating: parseFloat(
      groupReview[0].averageRating.toFixed(1),
    ) as number,
    reviewCount: groupReview[0].numberOfRatings,
  }
  return result
}

export const bestCourseServices = {
  getBestCourseFromDB,
}
