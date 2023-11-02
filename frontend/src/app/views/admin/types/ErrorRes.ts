export interface ErrorRes {
    error: {
        errorCode: number,
        isOperational: boolean,
        message: string,
        status: string
    }
}