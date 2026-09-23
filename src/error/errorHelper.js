
class ApiError extends Error {

    constructor(
        statusCode = 500,
        message = "Internal Server Error",
        error = null
    ) {

        super(message);

        this.statusCode = statusCode;

        this.error = error;

        Error.captureStackTrace(this, this.constructor);

    }

}

export default ApiError;