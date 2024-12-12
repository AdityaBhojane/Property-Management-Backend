

export default function customSuccessResponse(message:string,data:unknown){
    return ({
        success:true,
        message:message,
        data:data
    })
}