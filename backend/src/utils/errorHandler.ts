class AppError extends Error{
    status: string;
    statusCode: number;

    constructor(message: string, status: string, statusCode: number) {
        super(message);
        this.status = status
        this.statusCode = statusCode

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export default AppError