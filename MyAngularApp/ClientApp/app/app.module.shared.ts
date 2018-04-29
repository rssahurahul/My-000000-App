import { NgModule } from '@angular/core';
import { CommonModule, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { HttpClient,HttpHandler } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { HttpErrorHandler, HandleError } from '../app/components/http-error-handler.service';
import { MessageService } from '../app/components/message.service';
import { ConfigService } from './components/config/config.service';

import { AppComponent } from './components/app/app.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { DashBoardComponent } from './components/dashboard/dashboard.component';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        DashBoardComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
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
    providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }, HttpErrorHandler, MessageService, ConfigService]
})
export class AppModuleShared {
}
