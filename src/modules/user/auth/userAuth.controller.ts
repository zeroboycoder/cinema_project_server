import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserModel from '@models/user.model'
import { successResponse } from '@utils/response'
import { generateToken } from '@middlewares/jwt'
import { cleanObj } from '@utils/index'
import { errorHandler } from '@middlewares/errorHandler'

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = cleanObj(req.body)

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // check the user exist or not
    const user = await UserModel.findOne({
      where: {
        email
      }
    })
    if (user) {
      throw new Error('User already exist')
    }

    const newUser = await UserModel.create({
      email,
      password: hashedPassword
    })

    // generate token
    const token = generateToken({ id: newUser.id, type: 'user' })

    successResponse(res, 'Register successfully', { token })
  } catch (error) {
    console.log("error : ")
    next(error)
  }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = cleanObj(req.body)

    const user = await UserModel.findOne({
      where: {
        email
      }
    })
    if (!user) {
      throw new Error('User not found')
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      throw new Error('Invalid credentials')
    }

    // generate token
    const token = generateToken({ id: user.id, type: 'user' })

    successResponse(res, 'Login successfully', { token })
  } catch (error) {
    next(error);
  }
}