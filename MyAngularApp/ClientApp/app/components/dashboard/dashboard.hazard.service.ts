import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

export interface ClientLogo {
    Logo: string;
}

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class DashboardHazardService {
    serviceUrl: string;
    private handleError: HandleError;
    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler, configService: ConfigService) {
        this.handleError = httpErrorHandler.createHandleError('NavBarService');
        this.serviceUrl = configService.getServiceUrl();

    }

    getClientLogo(): Observable<ClientLogo> {
        return this.http.get<ClientLogo>(this.serviceUrl, { params: new HttpParams().set('resource', '/clientlogo').set('method', 'GET').set('id', '2') })
      
            //.pipe(
            //catchError(this.handleError('getClientLogo', {Logo: '' }))
            //);
    }


}