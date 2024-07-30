import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludeUserPasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.excludePassword(data)));
  }

  private excludePassword(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.omitPassword(item));
    }
    return this.omitPassword(data);
  }

  private omitPassword(user: any): any {
    if (user && user.password !== undefined) {
      const result = { ...user };
      delete result.password;
      return result;
    }
    return user;
  }
}
