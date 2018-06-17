import { NgModule } from '@angular/core';
import { CommonModule, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { HttpClient,HttpHandler } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MobxAngularModule } from 'mobx-angular';

import { HttpErrorHandler, HandleError } from '../app/components/http-error-handler.service';
import { MessageService } from '../app/components/message.service';
import { ConfigService } from './components/config/config.service';

import { Store } from './components/dashboard/Store';
import { AppComponent } from './components/app/app.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { DashBoardComponent } from './components/dashboard/dashboard.component';
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
    providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }, HttpErrorHandler, MessageService, ConfigService,Store]
})
export class AppModuleShared {
}
