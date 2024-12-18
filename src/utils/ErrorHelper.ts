
class ErrorHelper extends Error{
    statusCode:number;
    error:unknown;
    constructor(message:string,statusCode:number,error:unknown){
        super();
        this.message=message,
        this.statusCode=statusCode,
        this.error=error
    }
}

export default ErrorHelper;