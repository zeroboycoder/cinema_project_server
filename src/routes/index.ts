import { Router } from 'express'
import adminRoutes from './admin';
import userRoutes from './user';

const route = Router()

route.use('/admin', adminRoutes)
route.use('/user', userRoutes)

export default route;