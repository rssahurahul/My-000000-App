import { Injectable, LOCALE_ID } from '@angular/core';
import { observable, action, computed } from 'mobx';
import { DashboardHazardService } from './dashboard.hazard.service';
import { PercentPipe, CurrencyPipe, getLocaleCurrencySymbol, getLocaleId } from '@angular/common';

@Injectable()
export class Store {
    constructor(private percentPipe: PercentPipe, private currencyPipe: CurrencyPipe, private dashboardHazardService: DashboardHazardService) {
        // this.percentPipe = new PercentPipe('en-US');
        this.currency = getLocaleCurrencySymbol(LOCALE_ID.toString()) || '';
    }

    //culture: string = getLocaleId(LOCALE_ID.toString());
    locale: string = getLocaleId(LOCALE_ID.toString());
    currency: string;

    @observable
    hazardData: any = {
        Hail_1_Factor: 0,
        HighThresholds: 0
    }



    //HazardData: {
    //    PerilTotlimProfileLocs: number,
    //    PortfolioDate: string,
    //    toDay: Date,
    //    HighThresholds: number,
    //    MedThresholds: number,
    //    EstLossDonutLegend: Array<any>,
    //    LocAtRiskDonutLegend: Array<any>,
    //    Date: Date,
    //    TheDay: number,
    //    MonthOfTheDay: number,
    //    HailCount: number,
    //    TornCount: number,
    //    WindCount: number,
    //    HUR_AtlanticCount: number,
    //    HUR_PacificCount: number,
    //    WF_LocationCount: number,
    //    WF_PerimeterCount: number,
    //    EQ_HourCount: number,
    //    EQ_DayCount: number,
    //    WindPinCount: number,
    //    HailPinCount: number,
    //    TornPinCount: number,
    //    WF_LocationPinCount: number,
    //    WF_PerimeterPinCount: number,
    //    EQPinCount: number,
    //    HURPinCount: number,

    //    WindTotlim: number,
    //    HailTotlim: number,
    //    TornTotlim: number,
    //    WF_LocationTotlim: number,
    //    WF_PerimeterTotlim: number,
    //    EQTotlim: number,
    //    HURTotlim: number,
    //    TotalLocations: number,      
    //    TotalInsuredLimit: number,
    //    PerilTotlimProfile: number,
    //    Hail_1_LocationCount: number,
    //    Hail_1_Totlim: number,

    //    Hail_1_Events: number,
    //    Hail_1_Factor: number,
    //    Hail_2_LocationCount: number,
    //    Hail_2_Totlim: number,

    //    Hail_2_Events: number,
    //    Hail_2_Factor: number,
    //    Hail_3_LocationCount: number,
    //    Hail_3_Totlim: number,

    //    Hail_3_Events: number,
    //    Hail_3_Factor: number,
    //    Hail_4_LocationCount: number,
    //    Hail_4_Totlim: number,

    //    Hail_4_Events: number,
    //    Hail_4_Factor: number,
    //    Hail_5_LocationCount: number,
    //    Hail_5_Totlim: number,

    //    Hail_5_Events: number,
    //    Hail_5_Factor: number,
    //    HailLocationCount: number,

    //    HailEvents: number,
    //    Wind_1numbernumber_LocationCount: number,
    //    Wind_1numbernumber_Totlim: number,

    //    Wind_1numbernumber_Events: number,
    //    Wind_1numbernumber_Factor: number,
    //    Wind_75_LocationCount: number,
    //    Wind_75_Totlim: number,

    //    Wind_75_Events: number,
    //    Wind_75_Factor: number,
    //    Wind_6number_LocationCount: number,
    //    Wind_6number_Totlim: number,

    //    Wind_6number_Events: number,
    //    Wind_6number_Factor: number,
    //    Wind_5number_LocationCount: number,
    //    Wind_5number_Totlim: number,

    //    Wind_5number_Events: number,
    //    Wind_5number_Factor: number,
    //    Wind_number_LocationCount: number,
    //    Wind_number_Totlim: number,

    //    Wind_number_Events: number,
    //    Wind_number_Factor: number,
    //    WindLocationCount: number,

    //    WindEvents: number,
    //    TornLocationCount: number,


    //    TornEvents: number,
    //    Torn_Factor: number,
    //    WFLocationCount: number,
    //    WFTotlim: number,

    //    WFEvents: number,
    //    WF_Location_LocationCount: number,
    //    WF_Location_Totlim: number,

    //    WF_Location_Events: number,
    //    WF_Point_Factor: number,
    //    WF_Perimeter_LocationCount: number,
    //    WF_Perimeter_Totlim: number,

    //    WF_Perimeter_Events: number,
    //    WF_Perimeter_Factor: number,
    //    Hur_39_LocationCount: number,
    //    Hur_39_Totlim: number,

    //    Hur_39_Events: number,
    //    Hur_39_Factor: number,
    //    Hur_58_LocationCount: number,
    //    Hur_58_Totlim: number,

    //    Hur_58_Events: number,
    //    Hur_58_Factor: number,
    //    Hur_74_LocationCount: number,
    //    Hur_74_Totlim: number,

    //    Hur_74_Events: number,
    //    Hur_74_Factor: number,
    //    HURLocationCount: number,

    //    HUREvents: number,
    //    EQ_number_LocationCount: number,
    //    EQ_number_Totlim: number,

    //    EQ_number_Events: number,
    //    EQ_number_Factor: number,
    //    EQ_5_LocationCount: number,
    //    EQ_5_Totlim: number,

    //    EQ_5_Events: number,
    //    EQ_5_Factor: number,
    //    EQ_6_LocationCount: number,
    //    EQ_6_Totlim: number,

    //    EQ_6_Events: number,
    //    EQ_6_Factor: number,
    //    EQ_7_LocationCount: number,
    //    EQ_7_Totlim: number,

    //    EQ_7_Events: number,
    //    EQ_7_Factor: number,
    //    EQ_8_LocationCount: number,
    //    EQ_8_Totlim: number,

    //    EQ_8_Events: number,
    //    EQ_8_Factor: number,
    //    EQLocationCount: number,

    //    EQEvents: number,
    //    TotalLocation: number,
    //    TotalTotlim: number,

    //    TotalEvents: number
    //}



    @action
    loadAllHazardData(): any {
        this.dashboardHazardService.getAllHazardData().subscribe(data => {
            this.hazardData.Hail_1_Factor = data.PerilExposure.Hail_1_Factor;
            this.hazardData.HighThresholds = data.PerilExposure.HighThresholds;
        })
    }

    @computed
    get CHighThresholds(): any {
        return this.currencyPipe.transform(this.hazardData.HighThresholds, this.currency, true, this.culture);
    }
    set CHighThresholds(value) {
        this.hazardData.HighThresholds = value.replace(/[$,%]/g, "");
    }
    //@computed
    //getEstLoss1(): any {
    //    this.getEstLoss()
    //}
}
