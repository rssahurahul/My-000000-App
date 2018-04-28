import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service'
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
    logoUrl = '/clientlogo';
    private handleError: HandleError;
    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('NavBarService');

    }

    getClientLogo(): Observable<ClientLogo> {
        return this.http.get<ClientLogo>(this.logoUrl)
            .pipe(
            catchError(this.handleError('getClientLogo', {Logo: '' }))
            );
    }


}