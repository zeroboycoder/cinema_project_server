import { Router } from 'express'
import * as controllers from './movie.controller'
import { upload } from '@middlewares/fileMiddleware'

const route = Router();

route.post("/create", upload.single('image'), controllers.uploadMovie)

route.put("/update", upload.single('image'), controllers.updateMovie)

route.delete("/delete/:movieId", controllers.deleteMovie)

route.post("/upcoming/create", upload.single('image'), controllers.uploadUpcomingMovie)

route.get("/upcoming/lists", controllers.upcomingMoive)

route.get("/upcoming/lists/:id", controllers.upcomingMoiveDetail)

route.post("/genre/create", controllers.createGenre)

route.get("/bookings", controllers.bookingLists)

route.get("/bookings/:id", controllers.bookingDetail)

export default route;