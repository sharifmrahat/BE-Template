import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import routes from './app/routes'
import httpStatus from 'http-status'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import cookieParser from 'cookie-parser'
const app: Application = express()

app.use(cors())
app.use(cookieParser())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//default status
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'App is running',
  })
})

//api end points
app.use('/api/v1/', routes)

//global error handler
app.use(globalErrorHandler)

//not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

export default app
