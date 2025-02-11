import { Router } from 'express'
import UserAuthRoutes from '../modules/user/auth/userAuth.routes'
import UserProfileRoutes from '../modules/user/profile/userProfile.routes'
import MovieRoutes from '../modules/user/movie/movie.routes'
import BookingRoutes from '../modules/user/booking/booking.routes'

const route = Router()

route.use('/auth', UserAuthRoutes)
route.use('/profile', UserProfileRoutes)
route.use('/movies', MovieRoutes)
route.use('/bookings', BookingRoutes)

export default route;