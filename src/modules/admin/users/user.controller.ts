import { Request, Response, NextFunction } from 'express'
import { Op } from 'sequelize'
import UserModel from '@models/user.model'
import { successResponse } from '@utils/response'

export const fetchUser = async (req: Request, res: Response, next: NextFunction) => {
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

    const movies = await UserModel.findAll({
      where,
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [["createdAt", order]]
    })

    const totalCount = await UserModel.count({
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
