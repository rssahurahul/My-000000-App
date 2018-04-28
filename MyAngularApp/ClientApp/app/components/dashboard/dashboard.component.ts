import { Component ,OnInit} from '@angular/core';
import { DashboardHazardService} from './dashboard.hazard.service';
@Component({
    selector: 'pi-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [DashboardHazardService]
})
export class DashBoardComponent implements OnInit{
    constructor(private dashboardHazardService: DashboardHazardService) {

    }
    ngOnInit() {
        this.dashboardHazardService.getClientLogo().subscribe(companyLogo => companyLogo.Logo ='data:image/png;base64,'+companyLogo.Logo);
    }
}