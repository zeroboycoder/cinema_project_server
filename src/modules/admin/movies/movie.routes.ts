import { Router } from 'express'
import * as controllers from './movie.controller'
import { upload } from '@middlewares/fileMiddleware'

const route = Router();

route.post("/image/upload", upload.single('image'), controllers.uploadMovie)

// route.post("/", controllers.loginAdmin)

export default route;