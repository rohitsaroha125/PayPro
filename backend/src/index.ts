import 'dotenv/config'
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import * as express from "express"
import { Request, Response, NextFunction } from "express"
import AppError from './utils/errorHandler'
import errorController from './controllers/errorController'

require('dotenv').config()

const app = express()
const port = 5000 || process.env.PORT
app.use(express.json())

AppDataSource.initialize().then(async () => {
    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.email = "rohit@yopmail.com"
    // user.password = "123456"
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")
    console.log("Connected with database")
})

app.get("/users", function (req: Request, res: Response) {
    // here we will have logic to return all users
    res.send('Hello world')
})

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