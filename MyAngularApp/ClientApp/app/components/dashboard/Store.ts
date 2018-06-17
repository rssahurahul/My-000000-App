import { Injectable } from '@angular/core';
import { observable, action, computed } from 'mobx';
import { DashboardHazardService} from './dashboard.hazard.service';
@Injectable()
export class Store {
    constructor(private dashboardHazardService: DashboardHazardService) {
        
    }



    @action
    loadAllHazardData():any {

    }

    @computed
   get getEstLoss(): any {
        return 0;
    }

    @computed
    getEstLoss1(): any {
        this.getEstLoss()
    }
}
