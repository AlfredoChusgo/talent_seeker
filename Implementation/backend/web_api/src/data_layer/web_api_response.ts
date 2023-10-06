export interface ErrorResponse {
    success: boolean;
    errors: string[];
}


export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
