import { Injectable, LOCALE_ID } from '@angular/core';
import { observable, action, computed } from 'mobx';
import { DashboardHazardService } from './dashboard.hazard.service';
import { PercentPipe, CurrencyPipe, getLocaleCurrencySymbol, getLocaleId } from '@angular/common';
import * as $ from 'jquery';

@Injectable()
export class Store {
    constructor(private percentPipe: PercentPipe, private currencyPipe: CurrencyPipe, private dashboardHazardService: DashboardHazardService) {
        // this.percentPipe = new PercentPipe('en-US');
        //this.currency = getLocaleCurrencySymbol(LOCALE_ID.toString()) || '';
        //this.locale = getLocaleId(LOCALE_ID.toString());

        this.currency = '$';
        this.locale = 'en-US';

        this.PortfolioDate="";
        this.TotalEvents=0;
        this.TotalLocation=0;
        this.lastDateObj=0;
        this.daytime="";
        this.lastDayTime="";
    }

    //culture: string = getLocaleId(LOCALE_ID.toString());
    locale: string;
    currency: string;

    PortfolioDate: string;
    TotalEvents: number;
    TotalLocation: number;
    lastDateObj: any = {};
    daytime: string;
    lastDayTime: string;
    //interface hazardData

    @observable
    hazardData: any = {
        StartDateUTC: null,
        EndDateUTC: null,
        SelectedDateUTC: null,

        Hail_1_Factor: 0,
        HighThresholds: 0
    }

    getLastCurrentDate(endDateUTC: Date, selectedDateUTC: Date, argDayTime: string) {
        var defaultDate = new Date();
        var dateObj = { date: defaultDate, endDate: defaultDate, actualEndDate: defaultDate, selectedDateUTC: selectedDateUTC, endDateUTC: endDateUTC, dayTime: '11 pm', lastDateIsChanged: false, lastCalendarDate:"" };

        this.hazardData.lastDayTime = argDayTime.toLocaleLowerCase();
        var _selectedDate = new Date(selectedDateUTC);

        var _endDate = new Date(endDateUTC);
        dateObj.actualEndDate = new Date(_endDate.getUTCFullYear(), _endDate.getUTCMonth(), _endDate.getUTCDate()/*, _endDate.getUTCHours(), _endDate.getUTCMinutes(), _endDate.getUTCSeconds()*/);


        var strEndDate, strDate;

        if (this.lastDateObj.dateChangedFrom === 'trendline') {
            strEndDate = _endDate.getFullYear().toString() + ("0" + (_endDate.getMonth() + 1)).slice(-2) + ("0" + _endDate.getDate()).slice(-2);
            strDate = this.lastDateObj.date.getFullYear().toString() + ("0" + (this.lastDateObj.date.getMonth() + 1)).slice(-2) + ("0" + this.lastDateObj.date.getDate()).slice(-2);
        }


        if (((this.daytime === '11 am' || this.daytime === '') && this.lastDateObj.dateChangedFrom === 'trendline' && strEndDate === strEndDate)) {
            _selectedDate.setDate(_selectedDate.getDate() + 1);
            dateObj.lastDateIsChanged = true;
            dateObj.endDate = new Date(_selectedDate.getUTCFullYear(), _selectedDate.getUTCMonth(), _selectedDate.getUTCDate()/*, _selectedDate.getUTCHours(), _selectedDate.getUTCMinutes(), _selectedDate.getUTCSeconds()*/);
        }
        else if (selectedDateUTC === endDateUTC && this.lastDayTime == '11 pm' && this.lastDateObj.dateChangedFrom !== 'trendline') {
            _selectedDate.setDate(_selectedDate.getDate() + 1);
            dateObj.lastDateIsChanged = true;
            dateObj.endDate = new Date(_selectedDate.getUTCFullYear(), _selectedDate.getUTCMonth(), _selectedDate.getUTCDate()/*, _selectedDate.getUTCHours(), _selectedDate.getUTCMinutes(), _selectedDate.getUTCSeconds()*/);
        }
        else {
            dateObj.dayTime = '';

            if (this.lastDayTime == '11 pm') {
                _endDate.setDate(_endDate.getDate() + 1);
            }
            dateObj.endDate = new Date(_endDate.getUTCFullYear(), _endDate.getUTCMonth(), _endDate.getUTCDate()/*, _endDate.getUTCHours(), _endDate.getUTCMinutes(), _endDate.getUTCSeconds()*/);
        }
        dateObj.date = new Date(_selectedDate.getUTCFullYear(), _selectedDate.getUTCMonth(), _selectedDate.getUTCDate()/*, _selectedDate.getUTCHours(), _selectedDate.getUTCMinutes(), _selectedDate.getUTCSeconds()*/);

        if (this.lastDateObj && this.lastDateObj.dateFromDatepicker) { //this condition will only be false for first loading
            dateObj.lastCalendarDate = (this.lastDateObj.dateFromDatepicker.getMonth() + 1) + '/' + this.lastDateObj.dateFromDatepicker.getDate() + '/' + this.lastDateObj.dateFromDatepicker.getFullYear();
        }
        else {
            dateObj.lastCalendarDate = (dateObj.date.getMonth() + 1) + '/' + dateObj.date.getDate() + '/' + dateObj.date.getFullYear();
        }
        
        $.extend(true, this.lastDateObj, dateObj);
        return this.lastDateObj;
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
            this.hazardData.HighThresholds = data.HighThresholds;
            this.hazardData.MedThresholds = data.MedThresholds
            this.hazardData.StartDateUTC = data.DateRange["StartDateUTC"];
            this.hazardData.EndDateUTC = data.DateRange["EndDateUTC"];
            this.hazardData.SelectedDateUTC = data["Date"];
            this.lastDateObj = this.getLastCurrentDate(this.hazardData.EndDateUTC, this.hazardData.SelectedDateUTC, data.DateRange.LastDaytime);
            //var date = app.Dashboard.lastDateObj.date;
            //if (app.Dashboard.lastDateObj.dateChangedFrom === 'datepicker' && app.Dashboard.lastDateObj.dateFromDatepicker) {
            //    date = app.Dashboard.lastDateObj.dateFromDatepicker;
            //}
        });
    }

    @computed
    get CHighThresholds(): any {
        return this.currencyPipe.transform(this.hazardData.HighThresholds, this.currency, true, 'en-US');
    }
    set CHighThresholds(value) {
        this.hazardData.HighThresholds = value.replace(/[$,%]/g, "");
    }
    //@computed
    //getEstLoss1(): any {
    //    this.getEstLoss()
    //}
}
