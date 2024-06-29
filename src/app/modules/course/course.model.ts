import { Schema, model } from 'mongoose'
import { TCourse, TTags } from './course.interface'

const tagSchema = new Schema<TTags>({
  name: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
})

const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, unique: true, required: true },
    instructor: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category id is required'],
    },
    price: { type: Number, required: true },
    tags: [tagSchema],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: {
      level: { type: String, required: true },
      description: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  },
)

courseSchema.pre('save', function (next) {
  if (this.startDate && this.endDate) {
    const start = new Date(this.startDate)
    const end = new Date(this.endDate)
    const durationInMilliseconds = end.getTime() - start.getTime()
    const durationInWeeks = durationInMilliseconds / (1000 * 60 * 60 * 24 * 7)
    this.durationInWeeks = Math.ceil(durationInWeeks)
  } else {
    this.durationInWeeks = undefined
  }
  next()
})

export const Course = model<TCourse>('Course', courseSchema)
