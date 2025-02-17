import { NextFunction, Request, Response } from "express"
import { httpError } from '../../types'

export const errorHandler = (error: httpError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 400;

  res.status(500).json({
    name: error.name,
    statusCode,
    message: error.message
  })
}
