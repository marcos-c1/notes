enum ERROR_STATUS {
    JWT_NOT_FOUND = 401,
    PARAMS_NOT_FOUND = 400,
    SERVER_ERROR = 500,
    TOKEN_EXPIRED = 403
}

export const handleErrorService = (statusCode: number) => {
    switch (statusCode) {
        case ERROR_STATUS.JWT_NOT_FOUND:
            return "You must be logged to have access at your notes"
        case ERROR_STATUS.PARAMS_NOT_FOUND:
            return "Error in params passed to route"
        case ERROR_STATUS.SERVER_ERROR:
            return "Unexpected error behavior"
        case ERROR_STATUS.TOKEN_EXPIRED:
            return "Token expired. Please, login again."
        default:
            return "Error not handled with status code " + statusCode.toString();
    }
}