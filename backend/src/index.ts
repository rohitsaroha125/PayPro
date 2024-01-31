import 'dotenv/config'
require('dotenv').config()

import { AppDataSource } from './data-source'
import * as cors from 'cors'
import * as express from "express"
import { Request, Response, NextFunction } from "express"
import AppError from './utils/errorHandler'
import errorController from './controllers/errorController'
import userRoutes from './routes/userRoutes'
import transactionRoutes from './routes/transactionRoutes'

const app = express()
const port = 5000 || process.env.PORT

app.use(cors())

app.use(express.json())

AppDataSource.initialize().then(async () => {
    console.log("Connected with database")
})

app.use('/users', userRoutes)
app.use('/transaction', transactionRoutes)

app.all('*', (req: Request,res: Response,next: NextFunction) => {
    const err = new AppError(`Can't find ${req.originalUrl} on this server`, 'fail', 404)
    next(err)
})

app.use(errorController)

const server = app.listen(port,() => {
    console.log(`Server started on ${port}`)
})

process.on('unhandledRejection', (err:any) => {
    console.log('Error is ', err.name, err.message)
    console.log('UNHANDLED REJECTION! Shutting down...')
    server.close(() => {
        process.exit(1)
    })
})

process.on('uncaughtException', (err:any) => {
    console.log('Error is ', err.name, err.message)
    console.log('UNCAUGHT EXCEPTION! Shutting down...')
    server.close(() => {
        process.exit(1)
    })
})