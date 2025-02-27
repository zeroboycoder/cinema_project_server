import { Request, Response, NextFunction } from 'express'
import UserModel from '@models/user.model'
import bcrypt from 'bcrypt'
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
    const params: { userId?: number, name?: string, email?: string, oldPassword?: string, newPassword?: string } = p(req)

    if (!params.userId) throw new Error("User id is required");

    const user = await UserModel.findOne({
      where: {
        id: params.userId
      }
    })

    if (!user) {
      throw new Error("User not found")
    }

    if (params.oldPassword && params.newPassword) {
      const validPassword = await bcrypt.compare(params.oldPassword, user.password)
      if (!validPassword) {
        throw new Error('Invalid credentials')
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(params.newPassword, salt);

      await UserModel.update({
        password: hashedPassword
      }, {
        where: {
          id: user.id
        }
      })
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