import { Request, Response, NextFunction } from 'express'
import { Op } from 'sequelize'
import BookingModel from '@models/booking.model'
import { successResponse } from '@utils/response'

export const makeBooking = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    let { movie_id, seat_number, showing_time, card_number, mmyy, cvv } = req.query

    await BookingModel.create({
      user_id: id,
      movie_id,
      seat_number,
      showing_time,
      card_number,
      mmyy,
      cvv
    })

    return successResponse(res, "Successfully make booking", {})
  } catch (error) {
    next(error)
  }
}

export const getBookings = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    let { page = 1, pageSize = 10, order = "DESC" } = req.query

    page = Number(page)
    pageSize = Number(pageSize)
    order = String(order)

    const bookings = await BookingModel.findAll({
      where: {
        user_id: id
      },
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [["createdAt", order]]
    })

    return successResponse(res, "Successfully retrived", bookings)
  } catch (error) {
    next(error)
  }
}

export const getBookingDetail = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    const { booking_id } = req.params;

    const booking = await BookingModel.findOne({
      where: {
        id: booking_id,
        user_id: id
      }
    })

    return successResponse(res, "Successfully retrived", booking)
  } catch (error) {
    next(error)
  }
}