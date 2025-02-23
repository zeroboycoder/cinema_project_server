import { Router } from 'express'
import * as controllers from './user.controller'

const route = Router();

route.get("/lists", controllers.fetchUser)

export default route;