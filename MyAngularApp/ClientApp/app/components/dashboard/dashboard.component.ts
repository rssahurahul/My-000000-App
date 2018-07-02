import { Component ,OnInit} from '@angular/core';
import { DashboardHazardService, ClientLogo } from './dashboard.hazard.service';
import { MobxAngularModule } from 'mobx-angular';
import { Store } from './Store';

@Component({
    selector: 'pi-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [DashboardHazardService]
})
    
export class DashBoardComponent implements OnInit{
    companyLogo: ClientLogo = { Logo: '' };
    store: Store;
    constructor(private dashboardHazardService: DashboardHazardService, dataStore: Store) {
        this.store = dataStore;
    }
    ngOnInit() {
        this.dashboardHazardService.getClientLogo().subscribe(
            clientLogo => {
                this.companyLogo.Logo = 'data:image/png;base64,' + clientLogo.Logo
            });

        this.store.loadAllHazardData();
    }
}