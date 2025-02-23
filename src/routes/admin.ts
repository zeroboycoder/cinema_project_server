import { Router } from 'express'
import AdminAuthRoutes from '../modules/admin/auth/adminAuth.routes'
import MovieRoutes from '../modules/admin/movies/movie.routes'
import UserRoutes from '../modules/admin/users/user.routes'
import DashboardRoutes from '../modules/admin/dashboard/dashboard.routes'

const route = Router()

route.use('/auth', AdminAuthRoutes)
route.use('/movies', MovieRoutes)
route.use('/users', UserRoutes)
route.use('/dashboards', DashboardRoutes)

export default route;