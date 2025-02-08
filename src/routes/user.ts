import { Router } from 'express'
import UserAuthRoutes from '../modules/user/auth/userAuth.routes'
import UserProfileRoutes from '../modules/user/profile/userProfile.routes'

const route = Router()

route.use('/auth', UserAuthRoutes)

route.use('/profile', UserProfileRoutes)

export default route;