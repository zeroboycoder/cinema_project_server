import { Router } from 'express'
import * as controllers from './userAuth.controller'

const route = Router();

route.post("/register", controllers.registerUser)

route.post("/login", controllers.loginUser)

export default route;