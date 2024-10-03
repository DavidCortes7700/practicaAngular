import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class tokenInterceptor implements HttpInterceptor{

  constructor(private tokenService:TokenService){
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      req = this.addToken(req);
      return next.handle(req);
  }

  private addToken(req: HttpRequest<unknown>){
    const token = this.tokenService.getToken();
    if(token){
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
      return authRequest;
    }
    return req;
  }
}
