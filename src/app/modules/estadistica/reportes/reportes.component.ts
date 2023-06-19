import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NumberFormatPipe } from '@core/library/number.pipe';
import { AngularTokenService } from 'angular-token';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as _moment from 'moment';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { ButtonPrintComponent } from '@module/shared/button-print/button-print.component';
import { Report } from '@core/model/report';
import { ReporteService } from '@core/service/reporte.service';
import { CajamensualService } from '@core/service/cajamensual.service';
import { DatePipe } from '@angular/common';
import { CajaMensual } from '@core/model/cajamensual';
import { CajageneralService } from '@core/service/cajageneral.service';
import { TipoRegistro } from '@core/model/tiporegistro';

const moment = require('moment');
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  providers: [NumberFormatPipe,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },]
})
export class ReportesComponent implements OnInit {

  date = new FormControl(moment());
  mes!: number;
  anio!: number;
  periodo!: string;
  btnDisabled = true;
  @ViewChild('buttonreporte', { static: false }) buttonreporte!: ButtonPrintComponent;
  template: Report = new Report(); model:any;
  pipe = new DatePipe('en-US');
  cajaMensuales: CajaMensual[] =[];
  cuentaIngreso: any[] =[];  cuentaEgreso: any[] =[];
  saldoInicial: number = 0; totalIngreso : number = 0;totalEgreso : number = 0; saldo : number = 0; 
  agrupadoIngreso:number = 0;  agrupadoEgreso:number = 0;
  constructor(
    private tokenService: AngularTokenService,
    private ngxService: NgxUiLoaderService,
    private formatPipe: NumberFormatPipe,
    private reporteService: ReporteService,
    private cajamensualService: CajamensualService,
    private cajageneralService: CajageneralService,
  ) { }

  ngOnInit(): void {  
    this.tokenService.validateToken().subscribe(response => {
      this.anio = moment().year();
      this.mes = moment().month() + 1;    
    });
  }


  chosenYearHandler(normalizedYear: Moment,datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    this.anio = normalizedYear.year();
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
   // this.btnDisabled = false;
    datepicker.close();
    console.log('anio',  this.anio);
  }

  getTotalesByYear(){
    this.ngxService.start();
    this.cajaMensuales =  this.cuentaIngreso =   this.cuentaEgreso = [];
    this.saldoInicial = this.totalIngreso = this.totalEgreso =  this.saldo  =   this.agrupadoIngreso =  this.agrupadoEgreso = 0;
    if(this.anio == 2023){
      this.cajamensualService.getCajaMensualByAnio(this.anio.toString()).subscribe(response=>{
        this.cajaMensuales = response;
        let sumingreso = 0; let sumegreso = 0; let saldo = 0;
        this.cajaMensuales.forEach(element => {
           sumingreso += element.ingreso;
           sumegreso += element.egreso;
        });
        saldo = Number(sumingreso.toFixed(2)) - Number(sumegreso.toFixed(2));
        setTimeout(() => {
           this.saldoInicial = this.cajaMensuales[0]?.saldoinicial;
           this.totalIngreso = Number(sumingreso.toFixed(2));
           this.totalEgreso =  Number(sumegreso.toFixed(2));
           this.saldo = Number(saldo.toFixed(2));
           this.btnDisabled = false;
           this.registrosAgrupados();
           this.ngxService.stop();
        },2000);
      });
    }else{this.ngxService.stop();}
   
  }
   
  registrosAgrupados(){
    this.cajageneralService.getRegistrosAgrupados(this.anio.toString()).subscribe(registros=>{
      let cuentasingreso:any[] =[]; let cuentasegreso:any[] =[]; let asumingreso = 0; let asumegreso = 0;
      registros.forEach(element => {
          if(element.tiporegistro_id == TipoRegistro.INGRESO){
             asumingreso += element.suma;
             cuentasingreso.push({concepto:element.concepto[0]?.descripcion,subconcepto:element.subconcepto[0]?.descripcion,suma: Number(element.suma).toFixed(2)});
          }else{
             asumegreso += element.suma;
             cuentasegreso.push({concepto:element.concepto[0]?.descripcion,subconcepto:element.subconcepto[0]?.descripcion,suma: Number(element.suma).toFixed(2)});
          }
      });
      setTimeout(() => {
        this.cuentaIngreso = cuentasingreso;
        this.cuentaEgreso = cuentasegreso;
        this.agrupadoIngreso = Number(asumingreso.toFixed(2));
        this.agrupadoEgreso =  Number(asumegreso.toFixed(2));
      });
    });
  }


  cargarTemplate(templateid:any){
    this.reporteService.get(templateid).subscribe(response => {
      this.template = response;
      const usuario = this.tokenService.currentUserData.apellido + ', ' + this.tokenService.currentUserData.nombre;
      this.model = {
        fechaHoy: this.pipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss'),
        anio: this.anio,      
        usuario: usuario,
        mensuales: this.cajaMensuales,
        saldoinicial: this.formatNumber(this.saldoInicial),
        ingreso: this.formatNumber(this.totalIngreso),
        egreso: this.formatNumber(this.totalEgreso),
        saldo: this.formatNumber(this.saldo),  
        cuentaingreso: this.cuentaIngreso,
        cuentaegreso:   this.cuentaEgreso,   
        agrupadoingreso:  this.formatNumber(this.agrupadoIngreso),
        agrupadoegreso:  this.formatNumber(this.agrupadoEgreso) 
      };
      this.buttonreporte.template = response;
      this.buttonreporte.generateHtml();
    });
  }

  formatNumber(importe:any) {
    return this.formatPipe.transform(importe);
  }

  print($event: string) {
    const win = window.open();
    self.focus();
    win!.document.open();
    win!.document.write($event);
    win!.document.close();
    setTimeout(() => {
      win!.print();
      win!.close();
    }, 500);
  }

  // chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
  //   const ctrlValue = this.date.value;
  //   this.mes = normalizedMonth.month() + 1;
  //   ctrlValue.month(normalizedMonth.month());
  //   this.date.setValue(ctrlValue);
  //   datepicker.close();
  // }

}
