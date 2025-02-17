import { Router } from 'express'
import AdminAuthRoutes from '../modules/admin/auth/adminAuth.routes'
import MovieRoutes from '../modules/admin/movies/movie.routes'

const route = Router()

route.use('/auth', AdminAuthRoutes)
route.use('/movies', MovieRoutes)

export default route;