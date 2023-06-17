import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const code = status ? status : 500;

        console.log(exception)

        response
            .status(status)
            .json({
                timestamp: new Date().toISOString(),
                status: 'fail',
                data: exception.getResponse(),
                code: code
            });
    }
}