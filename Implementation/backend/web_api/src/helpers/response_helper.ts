import { ApiResponse, ErrorResponse } from "../data_layer/web_api_response";


export class ResponseHelper {

    public static createResponseSuccess<T>(message:string, data: T ):ApiResponse<T>{
        const response:ApiResponse<T> = {
            success:true,
            message: message,
            data : data
        };

        return response;
    }

    public static createErrorResponse(errorMessages:string[]){
        const response : ErrorResponse = {
            success : false,
            errors : errorMessages
        };

        return response;
    }
}