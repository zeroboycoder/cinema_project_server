import { Request, Response, NextFunction } from 'express'
import { Op } from 'sequelize'
import BookingModel from '@models/booking.model'
import MovieModel from '@models/movie.model';
import MovieDateModel from '@models/movieDate.model'
import { successResponse } from '@utils/response'

export const makeBooking = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    let { movie_id, seat_numbers, movie_date_id, time, card_number, mmyy, cvv, price } = req.body

    await BookingModel.create({
      user_id: id,
      seat_numbers, // array
      movie_id,
      movie_date_id,
      time,
      card_number,
      mmyy,
      cvv,
      price
    })

    return successResponse(res, "Successfully make booking", {})
  } catch (error) {
    next(error)
  }
}

export const updateBooking = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    const { booking_id } = req.params;
    let { seat_numbers, movie_date_id, time, card_number, mmyy, cvv, price } = req.body

    await BookingModel.update({
      seat_numbers, // array
      movie_date_id,
      time,
      card_number,
      mmyy,
      cvv,
      price
    }, {
      where: {
        id: booking_id,
        user_id: id
      }
    })

    return successResponse(res, "Successfully update booking", {})
  } catch (error) {
    next(error)
  }
}

export const deleteBooking = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    const { booking_id } = req.params;

    await BookingModel.destroy({
      where: {
        id: booking_id,
        user_id: id
      }
    })

    return successResponse(res, "Successfully delete booking", {})
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
      include: [{
        model: MovieModel,
        as: "movie"
      }, {
        model: MovieDateModel,
        as: "movie_date"
      }],
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
      },
      include: [
        {
          model: MovieModel,
          as: "movie"
        },
        {
          model: MovieDateModel,
          as: 'movie_date'
        }
      ]
    })

    return successResponse(res, "Successfully retrived", booking)
  } catch (error) {
    next(error)
  }
}

export const getBookedSeatByMovieId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const dateId = Number(req.query.dateId);

    const bookings = await BookingModel.findAll({
      where: {
        movie_id: id,
        movie_date_id: dateId
      }
    })

    let seats: any = []
    bookings.forEach(booking => {
      seats.push(booking.seat_numbers)
    })

    return successResponse(res, "Successfully retrived", seats.flat())
  } catch (error) {
    next(error)
  }
}