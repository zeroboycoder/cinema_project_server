import { Router } from 'express'
import * as controllers from './booking.controller'
import { verifyToken } from '../../../middlewares/jwt'

const route = Router();

route.post("/create", verifyToken, controllers.makeBooking)

route.put("/update/:booking_id", verifyToken, controllers.updateBooking)

route.delete("/delete/:booking_id", verifyToken, controllers.deleteBooking)

route.get("/list", verifyToken, controllers.getBookings)

route.get("/by-id/:booking_id", verifyToken, controllers.getBookingDetail)

route.get("/seat/by-id/:id", controllers.getBookedSeatByMovieId)

export default route;