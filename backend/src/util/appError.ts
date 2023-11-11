import { HttpStatus } from "../types/HttpStatus";

class AppError extends Error {
    message!: string;
    errorCode!: number;
    status!: string;
    constructor(message: string, statusCode: HttpStatus){
        super();
        this.message = message;
        this.errorCode = statusCode;
        this.status = `${statusCode}`.startsWith(`4`)?`failed` : `error`;
        Error.captureStackTrace(this, this.constructor);
    }
}
export default AppError;