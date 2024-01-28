import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NestMiddleware } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseTransformerInterceptor implements NestInterceptor{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (typeof data === 'string') {
          return { message: data };
        } else if (typeof data === 'object') {
          return { data };
        } else {
          return data;
        }
      }),
    );
  }
}