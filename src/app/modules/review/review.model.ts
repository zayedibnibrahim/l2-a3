import { Schema, model } from 'mongoose'
import { TReview } from './review.interface'

const reviewSchema = new Schema<TReview>({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Review',
    required: [true, 'Review id is required'],
  },
  rating: { type: Number, required: [true, 'Ratting is required'] },
  review: { type: String, required: [true, 'Review is required'] },
})

export const Review = model<TReview>('Review', reviewSchema)
