
import { Request, Response, NextFunction } from "express"
import * as jwt from 'jsonwebtoken'
import AppError from "./errorHandler"
import { PrivateRequest } from "../typeHelpers/requestType"

const privateRoutes = async(req: PrivateRequest, res: Response, next: NextFunction) => {
    try{
        const token = req.headers['authorization']
        if (!token) {
            next(new AppError('Unauthorized: Token not provided', 'error', 401))
        }

        const decodedData = await jwt.verify(token, process.env.JWT_SECRET_TOKEN)
        req.user = decodedData
        next()
    }catch(err){
        next(new AppError(err.message, 'error', 500))
    }
}

export default privateRoutes