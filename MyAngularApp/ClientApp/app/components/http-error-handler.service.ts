import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { MessageService } from './message.service';

export type HandleError = <T>(Operation?: string, result?:T) => (error: HttpErrorResponse) => Observable<T>;

@Injectable()
export class HttpErrorHandler {
    constructor(private messageService: MessageService) { }

    //createImageBitmap = (ServiceName = '') => <T>
    //    (operation = 'operation', result = {} as T) => this.handleError=>(serviceName, operation, result);
}