export const reponseSuccess = (data = null, message = `ok`, statusCode = 200) => {

    return {
        status: `success`,
        statusCode: statusCode,
        message: message,
        data: data,
        doc: "domain.com",
    }
}
export const responseError = (message ="Internal Sever Error", statusCode = 500, stack = null) =>{
    return {
        status: `error`,
        statusCode: statusCode,
        message: message,
        stack: stack,

    }

}