import { Injectable, NestInterceptor, ExecutionContext, CallHandler, InternalServerErrorException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> 
    {
        console.log('New request!');
        return next
            .handle()
            .pipe(
                tap(() => {
                    console.log({
                        status: 'success',
                        data: context
                    });
                }),
                catchError(err => {
                    console.log({
                        status: "fail",
                        data: err
                    });
                    return throwError(new InternalServerErrorException());
                })
            );
    }
}