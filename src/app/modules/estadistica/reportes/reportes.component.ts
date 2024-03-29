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
import { ConceptoService } from '@core/service/concepto.service';
import { SubconceptoService } from '@core/service/subconcepto.service';
import { Concepto } from '@core/model/concepto';
import { Subconcepto } from '@core/model/subconcepto';

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

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }]
})
export class ReportesComponent implements OnInit {

  //view: any[];
  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;

  view: any[] = [600, 400];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Meses';
  showYAxisLabel = true;
  yAxisLabel = 'Importes';
  legendTitle: string = 'Identificador';
  timeline = true;
  doughnut = true;
  colorScheme: any = {domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']};
  //pie
  showLabels = true;
  // data goes here
  result:any[] = [];

  meses = [
    { id: '0', name: 'Todos' },
    { id: '1', name: 'Enero' },
    { id: '2', name: 'Febrero' },
    { id: '3', name: 'Marzo' },
    { id: '4', name: 'Abril' },
    { id: '5', name: 'Mayo' },
    { id: '6', name: 'Junio' },
    { id: '7', name: 'Julio' },
    { id: '8', name: 'Agosto' },
    { id: '9', name: 'Septiembre' },
    { id: '10', name: 'Octubre' },
    { id: '11', name: 'Noviembre' },
    { id: '12', name: 'Diciembre' },
  ];

  tipoRegistros = [
    { id: 1, name: 'INGRESO' },
    { id: 2, name: 'EGRESO' }
  ];
  tipoRegistro_id!: number;
  mesSelect_id!: string;
  date = new FormControl(moment());
  date2 = new FormControl(moment());
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
  conceptos: Concepto[] = [];
  subConceptos: Subconcepto[] = [];
  concepto_id!: number;
  subconcepto_id!: number;
  constructor(
    private tokenService: AngularTokenService,
    private ngxService: NgxUiLoaderService,
    private formatPipe: NumberFormatPipe,
    private reporteService: ReporteService,
    private cajamensualService: CajamensualService,
    private cajageneralService: CajageneralService,
    private conceptoService: ConceptoService,
    private subconceptoService : SubconceptoService
  ) { }

  ngOnInit(): void {  
    this.tokenService.validateToken().subscribe(response => {
      this.anio = moment().year();
      this.mes = moment().month() + 1;    
    });
  }
  onSelect(event: any) {
    console.log(event);
  }
  changeTipoRegistro(tiporegistro_id: number) {
    this.conceptoService.getConceptosByTipoRegistro(tiporegistro_id).subscribe(conceptos => { this.conceptos = conceptos; });
  }

  changeConceptos(concepto_id: number) {
    this.subconceptoService.getSubconceptosByConcepto(concepto_id).subscribe(subconceptos => { this.subConceptos = subconceptos; });
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
    this.cajaMensuales =  this.cuentaIngreso =   this.cuentaEgreso = []; this.result = [];
    this.saldoInicial = this.totalIngreso = this.totalEgreso =  this.saldo  =   this.agrupadoIngreso =  this.agrupadoEgreso = 0;
    if(this.anio){ //verificar
      this.cajamensualService.getCajaMensualByAnio(this.anio.toString()).subscribe(response=>{
        this.cajaMensuales = response;
        let sumingreso = 0; let sumegreso = 0; let saldo = 0;
        this.cajaMensuales.forEach(element => {
           sumingreso += element.ingreso;
           sumegreso += element.egreso;
           this.result.push({name: element.periodo,series: [{name: "Ingreso",value: element.ingreso},{name: "Egreso",value: element.egreso}]});
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

  chosenYearTwoHandler(normalizedYear: Moment,datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    this.anio = normalizedYear.year();
    ctrlValue.year(normalizedYear.year());
    this.date2.setValue(ctrlValue);
   // this.btnDisabled = false;
    datepicker.close();
    console.log('anio',  this.anio);
  }


  getTotalesByCuenta(){
    this.ngxService.start();
    if(this.mesSelect_id != '' && this.anio){
       let periodo = this.mesSelect_id != '0'? this.mesSelect_id+'/'+ this.anio.toString():null;
       this.cajageneralService.getRegistrosByPeriodo(periodo,this.tipoRegistro_id,this.concepto_id,this.subconcepto_id).subscribe(response=>{
             console.log('response',response);
       }); 
    }
  }


  // chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
  //   const ctrlValue = this.date.value;
  //   this.mes = normalizedMonth.month() + 1;
  //   ctrlValue.month(normalizedMonth.month());
  //   this.date2.setValue(ctrlValue);
  //   datepicker.close();
  // }

}
