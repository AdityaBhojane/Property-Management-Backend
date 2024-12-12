

export default function customErrorResponse(message:string,error:unknown){
    return ({
        success:false,
        message:message,
        error:error
    })
}