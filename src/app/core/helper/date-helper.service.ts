import { Injectable } from '@angular/core';
//import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class DateHelperService {

    constructor() { }

    // static fromStringToDateUTC(date: string | Date): Date {
    //     return moment(date, 'YYYY-MM-DDTHH:mm').utc().toDate();
    // }

    /**
       * Return date formatted to be sent to API. It is based on Date object
       * From date `` to `getFromDateToApi to string `2019-06-19`
       * @param date
       * @param time
       * @return string
       */
    // static fromDatetoApi(date: Date): string {
    //     return moment(date).format("YYYY-MM-DD");
    // }

    static DATE_FORMAT = {
        parse: {
            dateInput: 'DD/MM/YYYY',
        },
        display: {
            dateInput: 'DD/MM/YYYY'
        },
    };

    static MONTH_FORMAT = {
        parse: {
            dateInput: 'MM/YYYY',
        },
        display: {
            dateInput: 'MM/YYYY',
        },
    };

    static getDays() {
        return [{
            value: 0,
            name: 'sunday'
        },
        {
            value: 1,
            name: 'monday'
        },
        {
            value: 2,
            name: 'tuesday'
        },
        {
            value: 3,
            name: 'wednesday'
        },
        {
            value: 4,
            name: 'thursday'
        },
        {
            value: 5,
            name: 'friday'
        },
        {
            value: 6,
            name: 'saturday'
        }
        ];
    }

    static getMonths() {
        return [
            {
                value: 0,
                name: 'january'
            },
            {
                value: 1,
                name: 'february'
            },
            {
                value: 2,
                name: 'march'
            },
            {
                value: 3,
                name: 'april'
            },
            {
                value: 4,
                name: 'may'
            },
            {
                value: 5,
                name: 'june'
            },
            {
                value: 6,
                name: 'july'
            },
            {
                value: 7,
                name: 'august'
            },
            {
                value: 8,
                name: 'september'
            },
            {
                value: 9,
                name: 'october'
            },
            {
                value: 10,
                name: 'november'
            },
            {
                value: 11,
                name: 'december'
            }
        ];
    }

    // 0 to 11 month
    static daysInMonth(iMonth: number, iYear: number) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }

    static nameOfMonth(iMonth: number): string {
        let index = -1;
        const months = this.getMonths();
        for (let i = 0; i < months.length && index < 0; i++) {
            if (months[i].value == iMonth) index = months[i].value;
        }
        return (index == -1) ? 'unknown' : months[index].name;
    }

    static nameOfDay(iDay: number): string {
        let index = -1;
        const days = this.getDays();
        for (let i = 0; i < days.length && index < 0; i++) {
            if (days[i].value == iDay) index = days[i].value;
        }
        return (index == -1) ? 'unknown' : days[index].name;
    }

    // convertDateToTimeZoneCurrent(date: Date):Date {
    //     return moment(date).parseZone().toDate();
    // }

}
