import { Router } from 'express'
import adminRoutes from './admin';
import userRoutes from './user';

const route = Router()

route.use('/admin', adminRoutes)
route.use('/user', userRoutes)

route.use("/health-check", (req: any, res: any) => {
  return res.status(200).json({
    status: "success",
    message: "API is working"
  })
})

export default route;