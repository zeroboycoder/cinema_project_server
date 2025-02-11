import { Router } from 'express'
import * as controllers from './movie.controller'

const route = Router();

route.get("/lists", controllers.getMovies)

route.get("/by-id/:id", controllers.getMovies)

export default route;