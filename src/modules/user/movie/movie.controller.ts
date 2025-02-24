import { Request, Response, NextFunction } from 'express'
import { Op } from 'sequelize'
import MovieModel from '@models/movie.model'
import GenreModel from '@models/genre.model'
import MovieDateModel from "@models/movieDate.model"
import { successResponse } from '@utils/response'

export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { page = 1, pageSize = 10, order = "DESC", search } = req.query

    page = Number(page)
    pageSize = Number(pageSize)
    order = String(order)

    let where: any = {};

    if (search) {
      where["name"] = {
        [Op.like]: `%${search}%`
      }
    }

    const movies = await MovieModel.findAll({
      where,
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [["createdAt", order]]
    })

    const totalCount = await MovieModel.count({
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

export const getMovieDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const movie = await MovieModel.findOne({
      where: {
        id
      },
      include: [
        {
          model: MovieDateModel,
          as: "movie_dates",
          attributes: ["id", "date"]
        }
      ]
    })

    successResponse(res, "Successfully retrived", movie)
  } catch (error) {
    next(error)
  }
}

export const getGenres = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const genres = await GenreModel.findAll()

    return successResponse(res, "Successfully retrived", genres)
  } catch (error) {
    next(error)
  }
}