import { Router } from 'express'
import * as controllers from './userProfile.controller'

const route = Router();

route.put("/update/:userId", controllers.updateUserProfile)

route.get("/by-id/:userId", controllers.getUserProfileById)

export default route;