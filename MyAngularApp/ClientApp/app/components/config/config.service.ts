import { Injectable,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

export interface config {
    baseUrl: string,
    resourceUrl:string
}

@Injectable()
export class ConfigService{
    constructor(private http: HttpClient) { }

    public clientId: number = 2;
    public readonly serviceUrl: string = '/api/ServiceProxy/Get';
 
    

    public handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('Error before request reached:' + error.error.message);
        }
        else {
            console.error(
                `Backend returned code${error.status} ` +
                `Body was: ${error.error}`);            
        }

        return new ErrorObservable('Some thing wrong happened. Please try again later.');

    }
}

