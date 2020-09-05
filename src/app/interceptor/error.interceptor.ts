import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticateService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
          if (err.status === 401 && err.error.error_code == "token_expired") {
              // auto logout if 401 response returned from api
              this.authenticationService.refreshToken();
              // location.reload(true);
              console.log("In Error Intercepter")
          }else if(err.status === 402 && err.error.error_code == "token_expired"){
            this.authenticationService.logout();
            location.reload(true)
          }
          this.authenticationService.error(err.error.message);
          const error = err.error.message || err.statusText;
          return throwError(error);
      }))
  }
}
