import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const timeInterceptor: HttpInterceptorFn = (req, next) => {
  const start = performance.now();
  return next(req).pipe(tap(() => {
    const time = (performance.now() - start) + 'ms';
    console.log(req.url, time);
  }));
};
