import { Request, Response, NextFunction } from 'express'
import UserModel from '@models/user.model'
import { p } from '@utils/index'
import { successResponse } from '@utils/response'

export const getUserProfileById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params: { userId?: number } = p(req)

    if (!params.userId) throw new Error("User id is required");

    const user = await UserModel.findOne({
      where: {
        id: params.userId
      },
      attributes: ["id", "email", "name"]
    })

    return successResponse(res, "Successfully retrived", user)
  } catch (error) {
    next(error)
  }
}

export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params: { userId?: number, name?: string, email?: string } = p(req)

    if (!params.userId) throw new Error("User id is required");

    const user = await UserModel.findOne({
      where: {
        id: params.userId
      }
    })

    if (!user) {
      throw new Error("User not found")
    }

    await UserModel.update({
      name: params.name,
      email: params.email
    }, {
      where: {
        id: user.id
      }
    })


    return successResponse(res, "Successfully updated", {})
  } catch (error) {
    next(error)
  }
}