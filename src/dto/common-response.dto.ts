export interface CommonResponseDto {
    code: number;
    message: string;
    status: string;
    data?: any;
    error?: any;
    hostname?: any;
}