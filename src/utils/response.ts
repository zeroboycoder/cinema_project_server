import { Response } from 'express'

export const successResponse = async (res: Response, msg: string, data: any, statusCode: number = 200) => {
  res.status(statusCode).json({
    status: 'success',
    message: msg,
    data
  })
}