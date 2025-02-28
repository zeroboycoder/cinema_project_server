import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { Op } from 'sequelize'
import moment from 'moment'
import UserModel from '@models/user.model'
import MovieModel from '@models/movie.model'
import UpcomingMovieModel from '@models/upcomingMovie.model'
import MovieDateModel from "@models/movieDate.model"
import GenreModel from '@models/genre.model'
import BookingModel from '@models/booking.model'
import { fileUpload } from '@utils/file'
import { successResponse } from '@utils/response'

export const uploadMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = Object.assign({}, req.body);
    const { name, description, duration, genre, movie_dates } = body

    const gerneNames = genre.split(",");
    const movieDates = movie_dates.split(",");

    const result = await fileUpload(req.file as any)
    const url = result.secure_url;

    // Create movie
    const data = {
      name,
      description,
      image: url,
      duration,
      genres: gerneNames
    }
    const newMovie = await MovieModel.create(data)

    // create movie_dates
    await Promise.all(
      movieDates.map(async (movie_date: any) => {
        await MovieDateModel.create({
          date: moment(movie_date).toDate(),
          movie_id: newMovie.id
        })
      })
    )

    // delete the file
    fs.unlinkSync(path.resolve(__dirname, `../../../uploads/${req.file?.filename}`))

    return successResponse(res, "Successfully created", {})
  } catch (error) {
    console.log({ error })
    next(error)
  }
}

export const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = Object.assign({}, req.body);
    const { movieId, name, description, duration, genre, movie_dates } = body

    let gerneNames;
    let movieDates = []
    if (genre) gerneNames = genre.split(",");
    if (movie_dates) movieDates = movie_dates.split(",");

    let url;
    if (req.file) {
      const result = await fileUpload(req.file as any)
      url = result.secure_url;
    }

    // Create movie
    const movie = await MovieModel.findOne({
      where: {
        id: movieId
      }
    })

    if (!movie) throw new Error("Movie not found")

    const data = {
      name: name || movie.name,
      description: description || movie.description,
      image: url || movie.image,
      duration: duration || movie.duration,
      genres: gerneNames || movie.genres
    }

    await MovieModel.update(data, {
      where: { id: movieId }
    })

    // create movie_dates
    if (movieDates.length > 0) {
      await Promise.all(
        movieDates.map(async (movie_date: any) => {
          // find the movie date
          const hasMovieDate = await MovieDateModel.findOne({
            where: {
              date: moment(movie_date).toDate()
            }
          })
          // create movie date
          if (!hasMovieDate) {
            await MovieDateModel.create({
              date: moment(movie_date).toDate(),
              movie_id: movieId
            })
          }
        })
      )
    }

    if (req.file) {
      // delete the file
      fs.unlinkSync(path.resolve(__dirname, `../../../uploads/${req.file?.filename}`))
    }

    return successResponse(res, "Successfully updated", {})
  } catch (error) {
    console.log({ error })
    next(error)
  }
}

export const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { movieId } = req.params;

    await MovieModel.destroy({
      where: {
        id: movieId
      }
    })

    return successResponse(res, "Successfully deleted", {})
  } catch (error) {
    next(error)
  }
}

export const createGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    await GenreModel.create({
      name
    })

    return successResponse(res, "Successfully created", {})
  } catch (error) {
    next(error)
  }
}

export const bookingLists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { page = 1, pageSize = 10, order = "DESC", search } = req.query
    console.log("here")

    page = Number(page)
    pageSize = Number(pageSize)
    order = String(order)

    let where: any = {};

    if (search) {
      where["name"] = {
        [Op.like]: `%${search}%`
      }
    }

    const movies = await BookingModel.findAll({
      where,
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["name", "email"]
        },
        {
          model: MovieModel,
          as: "movie",
          attributes: ["name", "description", "image"]
        }
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [["createdAt", order]]
    })

    const totalCount = await BookingModel.count({
      where,
    });

    const totalPage = Math.ceil(totalCount / pageSize);

    const dataPagination = {
      data: movies,
      currentPage: page,
      totalPage: totalPage,
      pageSize: pageSize,
      totalCount: totalCount,
    }
    return successResponse(res, "Successfully retrived", dataPagination)
  } catch (error) {
    next(error)
  }
}

export const bookingDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { id } = req.params

    const booking = await BookingModel.findOne({
      where: {
        id
      },
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["name", "email"]
        },
        {
          model: MovieModel,
          as: "movie",
          attributes: ["name", "description", "image"]
        }
      ]
    })

    return successResponse(res, "Successfully retrived", booking)
  } catch (error) {
    next(error)
  }
}

// upcoming movie
export const uploadUpcomingMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = Object.assign({}, req.body);
    const { name, description, duration, genre, date } = body

    const gerneNames = genre.split(",");

    const result = await fileUpload(req.file as any)
    const url = result.secure_url;

    // Create movie
    const data = {
      name,
      description,
      image: url,
      duration,
      genres: gerneNames,
      date: moment(date).toDate()
    }
    await UpcomingMovieModel.create(data)

    // delete the file
    fs.unlinkSync(path.resolve(__dirname, `../../../uploads/${req.file?.filename}`))

    return successResponse(res, "Successfully created", {})
  } catch (error) {
    next(error)
  }
}

export const upcomingMoive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("hello")
    let { page = 1, pageSize = 10, order = "DESC" } = req.query

    page = Number(page)
    pageSize = Number(pageSize)
    order = String(order)

    const movies = await UpcomingMovieModel.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [["createdAt", order]]
    })

    const totalCount = await UpcomingMovieModel.count();

    const totalPage = Math.ceil(totalCount / pageSize);

    const dataPagination = {
      data: movies,
      currentPage: page,
      totalPage: totalPage,
      pageSize: pageSize,
      totalCount: totalCount,
    }
    return successResponse(res, "Successfully retrived", dataPagination)
  } catch (error) {
    next(error)
  }
}

export const upcomingMoiveDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const result = await UpcomingMovieModel.findOne({
      where: {
        id
      }
    })

    return successResponse(res, "Successfully retrived", result)
  } catch (error) {
    next(error)
  }
}

export const deleteUpcomingMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    await UpcomingMovieModel.destroy({
      where: {
        id
      }
    })
    return successResponse(res, "Successfully deleted", {})
  } catch (error) {
    next(error)
  }
}