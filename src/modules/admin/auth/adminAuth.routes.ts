import { Router } from 'express'
import * as controllers from './adminAuth.controller'

const route = Router();

route.post("/register", controllers.registerAdmin)

route.post("/login", controllers.loginAdmin)

export default route;