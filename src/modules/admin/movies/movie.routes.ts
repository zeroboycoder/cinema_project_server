import { Router } from 'express'
import * as controllers from './movie.controller'
import { upload } from '@middlewares/fileMiddleware'

const route = Router();

route.post("/create", upload.single('image'), controllers.uploadMovie)

route.post("/genre/create", controllers.createGenre)

route.get("/bookings", controllers.bookingLists)

route.get("/bookings/:id", controllers.bookingDetail)

export default route;