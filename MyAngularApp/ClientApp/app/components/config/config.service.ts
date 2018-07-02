import { Injectable, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
//import { ActivatedRoute} from '@angular/router';

export interface config {
    baseUrl: string,
    resourceUrl:string
}


@Injectable()
export class ConfigService{
    location: Location;
    constructor(private http: HttpClient, location: Location, ) {
        this.location = location;

        this.serviceUrl = 'http://localhost:65108/api/ServiceProxy/Get';
    }
    
    public clientId: number = 2;
    private serviceUrl: string;
 
    
    getServiceUrl(): string {
        return this.serviceUrl;
    }

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

