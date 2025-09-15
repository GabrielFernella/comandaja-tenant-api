import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError'

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  console.error(err) // Log the error for debugging

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
}

export default errorHandler
