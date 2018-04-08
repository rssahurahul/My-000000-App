import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface config {
    baseUrl: string,
    resourceUrl:string
}

@Injectable()
export class ConfigService {
    constructor(private http: HttpClient) {}
}

