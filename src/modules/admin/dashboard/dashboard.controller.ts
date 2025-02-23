import { Request, Response, NextFunction } from 'express'
import UserModel from '@models/user.model'
import MovieModel from '@models/movie.model'
import BookingModel from '@models/booking.model'
import { successResponse } from '@utils/response'

export const dashboardCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalUsers = await UserModel.count();
    const totalMovies = await MovieModel.count();
    const totalBookings = await BookingModel.count();

    return successResponse(res, "Successfully retrived", {
      totalUsers,
      totalMovies,
      totalBookings
    })
  } catch (error) {
    next(error)
  }
}