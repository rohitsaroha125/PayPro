class AppError extends Error{
    status: string;
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, status: string, statusCode: number) {
        super(message);
        this.status = status
        this.statusCode = statusCode
        this.isOperational = true

        Error.captureStackTrace(this)
    }
}

export default AppError