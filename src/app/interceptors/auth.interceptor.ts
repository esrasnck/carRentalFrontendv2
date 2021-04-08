import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorgeService:LocalstorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token =this.localStorgeService.getToken();
    let newRequest:HttpRequest<any>;
    newRequest = request.clone({
      headers:request.headers.set("Authorization","Bearer "+token)
    });
    return next.handle(newRequest);
  }
}
