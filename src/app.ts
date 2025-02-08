import express, { Request, Response, NextFunction } from 'express';
import "module-alias/register"
import { errorHandler } from './middlewares/errorHandler'
import { httpError } from '../types';
import { modelLists } from './models/modelLists'
import routes from './routes'

const app = express()

// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.url)
  next()
})

// Models
modelLists;

// Routes
app.use("/api", routes)

// global error handling
app.use(errorHandler);

export default app;