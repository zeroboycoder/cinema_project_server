import { Request, Response, NextFunction } from 'express'
import { Op } from 'sequelize'
import MovieModel from '@models/movie.model'
import { successResponse } from '@utils/response'

export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { page = 1, pageSize = 10, order = "DESC", search } = req.query

    page = Number(page)
    pageSize = Number(pageSize)
    order = String(order)
    search = String(search)

    const movies = await MovieModel.findAll({
      where: search ? {
        name: {
          [Op.like]: `%${search}%`
        }
      } : {},
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [["createdAt", order]]
    })

    return successResponse(res, "Successfully retrived", movies)
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
      }
    })

    successResponse(res, "Successfully retrived", movie)
  } catch (error) {
    next(error)
  }
}
