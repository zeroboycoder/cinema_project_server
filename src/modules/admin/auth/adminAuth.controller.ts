import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import AdminModel from '@models/admin.model'
import { successResponse } from '@utils/response'
import { generateToken } from '@middlewares/jwt'
import { cleanObj } from '@utils/index'
import { errorHandler } from '@middlewares/errorHandler'

export const registerAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = cleanObj(req.body)

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await AdminModel.create({
      email,
      password: hashedPassword
    })

    // generate token
    const token = generateToken({ id: newAdmin.id, type: 'admin' })

    successResponse(res, 'Register successfully', { token })
  } catch (error) {
    console.log("error : ")
    next(error)
  }
}

export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = cleanObj(req.body)

    const admin = await AdminModel.findOne({
      where: {
        email
      }
    })
    if (!admin) {
      throw new Error('User not found')
    }

    const validPassword = await bcrypt.compare(password, admin.password)
    if (!validPassword) {
      throw new Error('Invalid credentials')
    }

    // generate token
    const token = generateToken({ id: admin.id, type: 'admin' })

    successResponse(res, 'Login successfully', { token })
  } catch (error) {
    next(error);
  }
}