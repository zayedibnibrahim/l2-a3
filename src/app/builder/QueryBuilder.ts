import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  filter() {
    const queryObj = { ...this.query }

    // Filtering
    const excludeFields = [
      'sortBy',
      'limit',
      'page',
      'minPrice',
      'maxPrice',
      'tags',
      'startDate',
      'endDate',
    ]
    excludeFields.forEach((el) => delete queryObj[el])

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

    return this
  }

  priceRangeFilter() {
    const priceRange: { price?: { $gte: number; $lte: number } } = {}

    if (this?.query?.minPrice && this?.query?.maxPrice) {
      priceRange.price = {
        $gte: parseFloat(this?.query?.minPrice as string),
        $lte: parseFloat(this?.query?.maxPrice as string),
      }
    }
    this.modelQuery = this.modelQuery.find(priceRange)

    return this
  }
  filterTag() {
    const tag = this?.query?.tags as string

    if (tag) {
      this.modelQuery = this.modelQuery.find({
        'tags.name': tag,
      } as FilterQuery<T>)
    }

    return this
  }

  sort() {
    const sort = (this?.query?.sortBy as string) || '-createdAt'
    this.modelQuery = this.modelQuery.sort(sort as string)

    return this
  }

  paginate() {
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 10
    const skip = (page - 1) * limit

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)

    return this
  }
}

export default QueryBuilder
