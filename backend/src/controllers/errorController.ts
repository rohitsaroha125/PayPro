import {Request, Response, NextFunction} from 'express'

interface Error{
    status: string;
    statusCode: number;
    message: string;
    isOperational: boolean;
    stack?: any;
}

const sendErrorDev = (err: Error, res: Response) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    })
}

const sendErrorProd = (err: Error, res: Response) => {
    // operational error

    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        // programming or any other unexpected error

        console.log('ERROR', err)

        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })
    }
}

const errorController = (err: Error, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV==='development') {
        sendErrorDev(err, res) 
    } else {
        sendErrorProd(err, res)
    }
}

export default errorController