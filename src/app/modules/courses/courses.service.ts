import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import { TCourse } from './courses.interface'
import { Course } from './courses.model'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import { TMeta } from '../../utils/sendResponse'
import { Review } from '../review/review.model'
import { TReview } from '../review/review.interface'

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload)
  return result
}

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find(), query)
    .paginate()
    .sort()
    .filter()
    .priceRangeFilter()
    .filterTag()
  const result = await courseQuery.modelQuery
  const count = await Course.countDocuments({})

  const meta: TMeta = {
    page: Number(query?.page) || 1,
    limit: Number(query?.limit) || 10,
    total: Number(count),
  }
  const allData = { result, meta }
  return allData
}

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id)
  return result
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const session = await mongoose.startSession()

  const { tags, details, ...remainingCourseData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingCourseData,
  }

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdatedData[`details.${key}`] = value
    }
  }

  try {
    session.startTransaction()
    const updatedDataWithoutTags = await Course.findByIdAndUpdate(
      id,
      modifiedUpdatedData,
      {
        new: true,
        runValidators: true,
        session,
      },
    )
    if (!updatedDataWithoutTags) {
      throw new AppError(400, 'Failed to update course!(without tag)')
    }

    if (tags && tags.length > 0) {
      // filter out the deleted fields
      const deletedTags = tags
        .filter((el) => el.name && el.isDeleted)
        .map((el) => el.name)
      const deleteTagsIntoDB = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            tags: { name: { $in: deletedTags } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )

      if (!deleteTagsIntoDB) {
        throw new AppError(400, 'Failed to update Tags!')
      }
      // filter out the new course fields
      const newTags = tags?.filter((el) => el.name && !el.isDeleted)
      const updateNewTags = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { tags: { $each: newTags } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )

      if (!updateNewTags) {
        throw new AppError(400, 'Failed to update new tags!')
      }
    }

    await session.commitTransaction()
    await session.endSession()

    const result = await Course.findById(id)
    return result
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
  }
}

const deleteCourseIntoDB = async (id: string) => {
  const result = await Course.findByIdAndDelete(id)
  return result
}

const getCourseReviewFromDB = async (id: string) => {
  const review = await Review.find({ courseId: id })
  if (review.length === 0) {
    throw new AppError(400, 'No review found for the course')
  }

  if (review.length) {
    const getCourse = await Course.findById(id)

    const result = {
      course: getCourse as TCourse,
      reviews: review as TReview[],
    }
    return result
  } else {
    throw new AppError(400, 'Course not found')
  }
}

export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseIntoDB,
  getCourseReviewFromDB,
}
