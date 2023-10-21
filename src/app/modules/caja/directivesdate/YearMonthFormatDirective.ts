import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Directive } from '@angular/core';

export const MY_FORMATS = {
    parse: {
        dateInput: 'MM/YYYY',
    },
    display: {
        dateInput: 'MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Directive({
    selector: '[appYearMonthFormat]',
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class YearMonthFormatDirective {
}


