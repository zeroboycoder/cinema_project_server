import { Router } from 'express'
import UserAuthRoutes from '../modules/user/auth/userAuth.routes'

const route = Router()

route.use('/auth', UserAuthRoutes)

export default route;