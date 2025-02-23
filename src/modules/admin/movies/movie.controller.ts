import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { Op } from 'sequelize'
import UserModel from '@models/user.model'
import MovieModel from '@models/movie.model'
import GenreModel from '@models/genre.model'
import BookingModel from '@models/booking.model'
import { fileUpload } from '@utils/file'
import { successResponse } from '@utils/response'

export const uploadMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = Object.assign({}, req.body);
    const { name, description, duration, genre } = body

    const gerneNames = genre.split(",");
    const result = await fileUpload(req.file as any)
    const url = result.secure_url;

    const data = {
      name,
      description,
      image: url,
      duration,
      genres: gerneNames
    }
    await MovieModel.create(data)

    // delete the file
    fs.unlinkSync(path.resolve(__dirname, `../../../uploads/${req.file?.filename}`))

    return successResponse(res, "Successfully created", {})
  } catch (error) {
    console.log({ error })
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