import { Injectable,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface config {
    baseUrl: string,
    resourceUrl:string
}

@Injectable()
export class ConfigService implements OnInit{
    constructor(private http: HttpClient) { }

    ngOnInit() {
        
    }
}

