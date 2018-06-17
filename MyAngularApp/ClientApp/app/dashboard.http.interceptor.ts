//import {Injectable } from '@angular/core';
//import {
//    HttpInterceptor,
//    HttpRequest,
//    HttpResponse,
//    HttpErrorResponse,
//    HttpHandler,
//    HttpEvent
//} from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/do';

//@Injectable()
//export class DashboardHttpInterceptor implements HttpInterceptor {
//    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//        return next.handle(request).do((event: HttpEvent<any>) => {
//            if (event instanceof HttpResponse) {
//                event = event.clone({});
//                return event;
//            }
//        });

//    }
//}

