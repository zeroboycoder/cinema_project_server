import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import MovieModel from '@models/movie.model'
import { fileUpload } from '@utils/file'
import { successResponse } from '@utils/response'

export const uploadMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, duration } = req.body
    const result = await fileUpload(req.file as any)
    const url = result.secure_url;

    await MovieModel.create({
      name,
      description,
      image: url,
      duration
    })

    // delete the file
    fs.unlinkSync(path.resolve(__dirname, `../../../uploads/${req.file?.filename}`))

    return successResponse(res, "Successfully created", {})
  } catch (error) {
    console.log({ error })
    next(error)
  }
}