import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from "@angular/common";

function padNumber(value: number) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return "";
    }
}

function isNumber(value: any): boolean {
    return !isNaN(toInteger(value));
}

function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}


@Injectable()
export class NgbDateCustom extends NgbDateParserFormatter {
    parse(value: string): NgbDateStruct {
        if (value) {
            const dateParts = value.trim().split('-');
            if (dateParts[0].length===4){
                //2019-01-20
                if (dateParts.length === 1 && isNumber(dateParts[0])) {
                    return {year: toInteger(dateParts[0]), month: null, day: null};
                } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                    return {year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null};
                } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                    return {year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2])};
                }
            
            }else if (dateParts[0].length===2){
                //20-01-2019
                if (dateParts.length === 1 && isNumber(dateParts[2])) {
                    return {year: toInteger(dateParts[2]), month: null, day: null};
                } else if (dateParts.length === 2 && isNumber(dateParts[2]) && isNumber(dateParts[1])) {
                    return {year: toInteger(dateParts[2]), month: toInteger(dateParts[1]), day: null};
                } else if (dateParts.length === 3 && isNumber(dateParts[2]) && isNumber(dateParts[1]) && isNumber(dateParts[0])) {
                    return {year: toInteger(dateParts[2]), month: toInteger(dateParts[1]), day: toInteger(dateParts[0])};
                }
            }
        }   
        return null;
    }

    format(date: NgbDateStruct): string {
        let stringDate: string = ""; 
        if(date) {
            stringDate += isNumber(date.day) ? padNumber(date.day) + "-" : "";
            stringDate += isNumber(date.month) ? padNumber(date.month) + "-" : "";
            stringDate += date.year;
        }
        return stringDate;
    }

   

  
}