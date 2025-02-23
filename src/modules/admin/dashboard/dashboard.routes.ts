import { Router } from 'express'
import * as controllers from './dashboard.controller'

const route = Router();

route.get("/count", controllers.dashboardCount)

export default route;