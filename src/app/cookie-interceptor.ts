import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


/**
 * Used  set correct cookie when requesting data from backend services.
 */
@Injectable()
export class CookieInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const clonedRequest = request.clone({ 
        withCredentials: true,
        headers: request.headers.set('Set-Cookie', 'JSESSIONID=' + localStorage.getItem('token'))
    });

    return next.handle(clonedRequest);
  }

}
