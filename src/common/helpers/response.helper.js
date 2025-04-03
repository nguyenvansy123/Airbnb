export const responseSuccess = (metaData = null, message = "ok", code = 200) => {
    if (typeof code !== `number`) code = 200
    return {
        status: 'success',
        code,
        message,
        metaData,
        doc: 'api.domain.com/doc'
    }
}


export const responseError = (message = "Internal Server Error", code = 500, stack) => {
    if (typeof code !== `number`) code = 500
    return {
        status: 'error',
        code,
        message,
        stack
    }
}