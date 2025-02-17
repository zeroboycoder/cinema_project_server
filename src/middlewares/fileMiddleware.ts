import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path'

let options: any = { limits: { fileSize: 10 * 1024 * 1024 } };


// const imageFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: FileFilterCallback,
// ) => {
//   console.log(file);
//   // Define allowed MIME types
//   const ALLOWED_MIME_TYPES = [
//     'image/png',
//     'image/jpg',
//     'image/jpeg',
//     'image/webp',
//   ];

//   const checkMineType = ALLOWED_MIME_TYPES.includes(file.mimetype);
//   if (!checkMineType)
//     cb(
//       new Error(
//         `Please use this kind of file extension : ${ALLOWED_MIME_TYPES}`,
//       ),
//     );
//   const upload_type = req.body?.upload_type || null;

//   if (
//     upload_type === UPLOAD_TYPE.IGNORE ||
//     upload_type === UPLOAD_TYPE.IGNORE_REDUCE
//   )
//     options = {};
//   cb(null, true);
// };

// const storage = multer.memoryStorage();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../uploads'));
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  }
})

export const upload = multer({
  storage,
});
