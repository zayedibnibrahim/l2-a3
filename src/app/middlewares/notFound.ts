/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express'

//Global error handler
const notFound: RequestHandler = (req, res, next) => {
  return res.status(400).json({
    success: false,
    message: 'API not found',
    error: '',
  })
}

export default notFound
