import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData, Location, LocationStrategy, PathLocationStrategy, PercentPipe, CurrencyPipe,DecimalPipe } from '@angular/common';
//import localeUs from '@angular/common/locales';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { HttpClient,HttpHandler } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MobxAngularModule } from 'mobx-angular';
import * as jQuery from 'jquery';
import { MyDatePickerModule } from 'mydatepicker';

import { HttpErrorHandler, HandleError } from '../app/components/http-error-handler.service';
import { MessageService } from '../app/components/message.service';
import { ConfigService } from './components/config/config.service';

import { Store } from './components/dashboard/Store';
import { AppComponent } from './components/app/app.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { DashBoardComponent } from './components/dashboard/dashboard.component';
import { DashboardHazardService } from './components/dashboard/dashboard.hazard.service';
import { RawNumericPipe } from './pipes/RawNumeric';

//import { DashboardHttpInterceptor } from './dashboard.http.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        DashBoardComponent
        //DashboardHttpInterceptor
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MobxAngularModule,
        MyDatePickerModule,
        //HttpClient,
        FormsModule,

        RouterModule.forRoot([
            { path: '', redirectTo: 'app', pathMatch: 'full' },
            //{ path: 'home', component: HomeComponent },
            //{ path: 'counter', component: CounterComponent },
            //{ path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'app' }
        ])
    ],
    providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }, HttpErrorHandler, MessageService, ConfigService, Store, DashboardHazardService, {provide:LOCALE_ID,useValue:'en'}, PercentPipe, CurrencyPipe,RawNumericPipe,DecimalPipe]
})
export class AppModuleShared {
}
