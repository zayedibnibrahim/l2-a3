import { Response } from 'express'
export type TMeta = {
  page: number
  limit: number
  total: number
}
type TResponse<T> = {
  statusCode: number
  success: boolean
  message?: string
  meta?: TMeta | undefined
  data: T | T[] | null
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta ? data.meta : undefined,
    data: data.data,
  })
}

export default sendResponse
