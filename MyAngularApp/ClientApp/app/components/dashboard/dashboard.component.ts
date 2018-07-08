import { Component, OnInit } from '@angular/core';
import { DashboardHazardService, ClientLogo } from './dashboard.hazard.service';
import { MobxAngularModule } from 'mobx-angular';
import { Store } from './Store';
import { RawNumericPipe } from '../../pipes/RawNumeric';
import {IMyDpOptions } from 'mydatepicker';
@Component({
    selector: 'pi-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [DashboardHazardService]
})

export class DashBoardComponent implements OnInit {
    companyLogo: ClientLogo = { Logo: '' };
    store: Store;
    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'mm/dd/yyyy',
        showInputField:false
    };
    constructor(private rawNumPipe:RawNumericPipe,private dashboardHazardService: DashboardHazardService, dataStore: Store) {
        this.store = dataStore;
    }
    ngOnInit() {
        this.dashboardHazardService.getClientLogo().subscribe(
            clientLogo => {
                this.companyLogo.Logo = 'data:image/png;base64,' + clientLogo.Logo
            });

        this.store.loadAllHazardData();
    }

    extractRawValue(value: string): number {
        return this.rawNumPipe.transform(value);
    }
}