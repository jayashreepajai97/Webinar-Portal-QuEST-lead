import { StorageService } from '../storage/storage.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private storage: StorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let baseURL = request.url.indexOf('api/');
        let currentUserToken = this.storage.getItem('token');
        
        if ((request.url.indexOf('/service/webinar/user/login')== -1 || request.url.indexOf('/service/webinar/user/forgot-password')== -1  || request.url.indexOf('/service/webinar/user/reset-password')== -1)) {
           
            request = request.clone({
                setHeaders: {
                    Authorization: `${currentUserToken}`,
                }
            });
        }
       
        // if (currentUserToken) {
        //     request = request.clone({
        //         setHeaders: {
        //             Authorization: `${currentUserToken}`,
        //         }
        //     });
        // }

        return next.handle(request);
    }
}