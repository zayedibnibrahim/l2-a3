import { Types } from 'mongoose'

export type TCourse = {
  title: string
  instructor: string
  categoryId: Types.ObjectId
  price: number
  tags: [TTags]
  startDate: string
  endDate: string
  language: string
  provider: string
  durationInWeeks: number | undefined
  details: {
    level: string
    description: string
  }
}

export type TTags = {
  _id: Types.ObjectId
  name: string
  isDeleted: boolean
}
