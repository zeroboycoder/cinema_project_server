import { Router } from 'express'
import * as controllers from './booking.controller'

const route = Router();

route.get("/create", controllers.makeBooking)

route.get("/list", controllers.getBookings)

route.get("/by-id/:booking_id", controllers.getBookings)

route.get("/seat/by-id/:id", controllers.getBookedSeatByMovieId)

export default route;