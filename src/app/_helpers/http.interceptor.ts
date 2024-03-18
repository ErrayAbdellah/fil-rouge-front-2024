import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StorageService } from '../_services/storage.service';
import { EventBusService } from '../_shared/event-bus.service';
import { EventData } from '../_shared/event';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
//   private isRefreshing = false;

//   constructor(private storageService: StorageService) { }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     req = req.clone({
//       withCredentials: true,
//     });

//     return next.handle(req).pipe(
//       catchError((error) => {
//         // logout when token is expired
// /*
//         if (
//           error instanceof HttpErrorResponse &&
//           !req.url.includes('auth/signin') &&
//           error.status === 401
//         ) {
//           return this.handle401Error(req, next);
//         }
// */
//         return throwError(() => error);
//       })
//     );
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem('auth-user');
        
       
        if (token) {
            const jsonToken = JSON.parse(token);
            request = request.clone({
                setHeaders: {
                Authorization: `Bearer ${jsonToken.token}`,
                },
            });
        }

        return next.handle(request);
        }
    }
////   private eventBusService: EventBusService
//   private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
//     if (!this.isRefreshing) {
//       this.isRefreshing = true;

//       if (this.storageService.isLoggedIn()) {
//         this.eventBusService.emit(new EventData('logout', null));
//       }
//     }

//     return next.handle(request);
//   }
// } 

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];