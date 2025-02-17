"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
let options = { limits: { fileSize: 10 * 1024 * 1024 } };
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
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.resolve(__dirname, '../uploads'));
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
});
exports.upload = (0, multer_1.default)({
    storage,
});
