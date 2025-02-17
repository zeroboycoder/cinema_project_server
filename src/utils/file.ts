require('dotenv').config();

import { v2 as cloudinary } from 'cloudinary';
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

interface IFile {
  path: string
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer
  size: number
}

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

export const fileUpload = async (file: IFile) => {
  const result = await cloudinary.uploader.upload(file.path, {
    folder: 'cinema_project',
  })

  return result
}