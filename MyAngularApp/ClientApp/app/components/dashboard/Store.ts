import { Injectable } from '@angular/core';
import { observable, action, computed } from 'mobx';
import { DashboardHazardService} from './dashboard.hazard.service';
@Injectable()
export class Store {
    constructor(private dashboardHazardService: DashboardHazardService) {
        
    }

    @observable
    HazardData: {
        PerilTotlimProfileLocs: number,
        PortfolioDate: string,
        toDay: Date,
        HighThresholds:number,
        MedThresholds: number,
        EstLossDonutLegend:Array<any>,
        LocAtRiskDonutLegend: Array<any>,


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
