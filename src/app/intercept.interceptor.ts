import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {HttpErrorResponse,HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';


import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable()
export class InterceptInterceptor implements HttpInterceptor {
 
  constructor(private router: Router,
    private tokenService: TokenService,
    private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): any {

      let json_blacklist = "/my/upload";
     

      const token = this.tokenService.getToken();
      const refreshToken = this.tokenService.getRefreshToken();

     
  
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token
          }
        });
      }


    //   if(request.url.includes(json_blacklist)) {
    //   // if (!request.headers.has('Content-Type')) {
       
    //     // delete reqHeaders.setHeaders["Content-Type"];
    //     console.log("black list contains")
    //     request = request.clone({
    //       setHeaders: {
    //         'content-type': 'multipart/form-data'
            
    //         // 'content-type':'undefined' 
    //       }
    //     });
        
    //   // }
    // }
    // else{
    //   console.log("black list contains")
    //   request = request.clone({
    //     setHeaders: {
          
    //       'content-type': 'application/json'
    //       // 'content-type':'undefined' 
    //     }
    //   });
     
    // }
  
      request = request.clone({
        
        headers: request.headers.set('Accept', '*')
      });
  
          
    
    return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('event--->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error.error.error);
          if (error.status === 401) {
            if (error.error.error === 'invalid_token') {
              this.authService.refreshToken({refresh_token: refreshToken})
                .subscribe(() => {
                  location.reload();
                });
            } else {
              this.router.navigate(['login']).then(_ => console.log('redirect to login'));
            }
          }
          return throwError(error);
        }));


// working part
    //   const token = this.tokenService.getToken();
    //   const refreshToken = this.tokenService.getRefreshToken();

     
  
    //   if (token) {
    //     request = request.clone({
    //       setHeaders: {
    //         Authorization: 'Bearer ' + token
    //       }
    //     });
    //   }
  
    //   if (!request.headers.has('Content-Type')) {
    //     request = request.clone({
    //       setHeaders: {
    //         'content-type': 'application/json'
    //         // 'content-type':'undefined' 
    //       }
    //     });
    //   }
  
    //   request = request.clone({
    //     // headers: request.headers.set('Accept', 'undefined' )
    //     headers: request.headers.set('Accept', 'application/json')
    //   });
  
          
    
    // return next.handle(request).pipe(
    //     map((event: HttpEvent<any>) => {
    //       if (event instanceof HttpResponse) {
    //         console.log('event--->>>', event);
    //       }
    //       return event;
    //     }),
    //     catchError((error: HttpErrorResponse) => {
    //       console.log(error.error.error);
    //       if (error.status === 401) {
    //         if (error.error.error === 'invalid_token') {
    //           this.authService.refreshToken({refresh_token: refreshToken})
    //             .subscribe(() => {
    //               location.reload();
    //             });
    //         } else {
    //           this.router.navigate(['login']).then(_ => console.log('redirect to login'));
    //         }
    //       }
    //       return throwError(error);
    //     }));
     
    }
}
