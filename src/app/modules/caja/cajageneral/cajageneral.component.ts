import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CajaGeneral } from '@core/model/cajageneral';
import { Concepto } from '@core/model/concepto';
import { FormaPago } from '@core/model/formapago';
import { Proveedor } from '@core/model/proveedor';
import { Subconcepto } from '@core/model/subconcepto';
import { TipoComprobante } from '@core/model/tipocomprobante';
import { CajageneralService } from '@core/service/cajageneral.service';
import { ConceptoService } from '@core/service/concepto.service';
import { FormapagoService } from '@core/service/formapago.service';
import { ProveedorService } from '@core/service/proveedor.service';
import { SubconceptoService } from '@core/service/subconcepto.service';
import { TipocomprobanteService } from '@core/service/tipocomprobante.service';
import { AngularTokenService } from 'angular-token';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogregistrocajaService } from '../dialogregistrocaja/dialogregistrocaja.service';
import { EditregistrocajaService } from '../editregistrocaja/editregistrocaja.service';
import Swal from 'sweetalert2';
import { TipoRegistro } from '@core/model/tiporegistro';
import { MatTableDataSource } from '@angular/material/table';
import { NumberFormatPipe } from '@core/library/number.pipe';
import { Report } from '@core/model/report';
import { ButtonPrintComponent } from '@module/shared/button-print/button-print.component';
import { ReporteService } from '@core/service/reporte.service';
import * as _moment from 'moment';
import { CajaMensual } from '@core/model/cajamensual';
import { CajamensualService } from '@core/service/cajamensual.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormBuilder, FormControl } from '@angular/forms';
import { Moment } from 'moment';
import * as moment from 'moment';

// const moment = require('moment');

// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'MM/YYYY',
//   },
//   display: {
//     dateInput: 'MM/YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };
@Component({
  selector: 'app-cajageneral',
  templateUrl: './cajageneral.component.html',
  styleUrls: ['./cajageneral.component.css'],
  providers: [NumberFormatPipe]
})


export class CajageneralComponent implements OnInit {
  anio?: string | null;
  mes?: string | null;
  periodoSelect?: string | null;
  newRegistroCaja: CajaGeneral = new CajaGeneral();
  registrosCaja: CajaGeneral[] = [];
  conceptos: Concepto[] = [];
  subConceptos: Subconcepto[] = [];
  formaPagos: FormaPago[] = [];
  tipoComprobantes: TipoComprobante[] = [];
  proveedores: Proveedor[] = [];
  viewFormulario = false;
  textbtn = 'Registrar Caja';
  icono = 'fa fa-plus fa-lg';

  textbtnc = 'Ver Total General';
  iconoc = 'visibility';

  today?: Date ;
  fechaDesde?: string | null;
  fechaHasta?: string | null;
  pipe = new DatePipe('en-US');

  totalingreso: number = 0;
  totalegreso: number = 0;
  totalneto: number = 0;

  totalFindIngreso: number = 0;
  totalFindEgreso: number = 0;
  totalFindNeto: number = 0;
  saldo: number = 0;
  findConcepto_id:number = 0;
  findSubconcepto_id:number = 0;
  findFormapago_id:number = 0;

  findConceptos: Concepto[] = [];
  findSubConceptos: Subconcepto[] = [];
  saveDisabled = true;
  tipoRegistros = [
    { id: 1, name: 'INGRESO' },
    { id: 2, name: 'EGRESO' }
  ];
  registroGeneral: any = null;
  btnExcel = true;
  showMyClass = false;
  dataSource: any;
  tienecaja = false;
  btnVerTotal = false;
  numerocomprobante: number = 0;
  displayedColumnsCaja: string[] = ['numregistro','fecha', 'concepto', 'subconcepto', 'formapago', 'importe', 'acciones'];
  displayedColumns: string[] = ['numregistro','fecha','tiporegistro', 'concepto', 'subconcepto', 'descripcion', 'formapago', 'ingreso','egreso'];
  @ViewChild('buttoncaja', { static: false }) buttoncaja!: ButtonPrintComponent;
  template: Report = new Report(); model:any;
  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  //date = new FormControl(moment());
  mesConsult!: number;
  anioConsult!: number;
  cajaMensualSelect: CajaMensual = new CajaMensual();
  periodoAnt: any[] = [];
  respcajaMensual: any = null;

  constructor(
    private fb: FormBuilder,
    private tokenService: AngularTokenService,
    private ngxService: NgxUiLoaderService,
    private cajageneralService: CajageneralService,
    private conceptoService: ConceptoService,
    private subconceptoService: SubconceptoService,
    private tipocomprobanteService: TipocomprobanteService,
    private formapagoService: FormapagoService,
    private proveedorService: ProveedorService,
    private dialogRegistroCaja: DialogregistrocajaService,
    private editarRegistroService: EditregistrocajaService,
    private formatPipe: NumberFormatPipe,
    private reporteService: ReporteService,
    private cajamensualService: CajamensualService
  ) { }
  
  form = this.fb.group({
    today: [moment()],
    date: [moment()],   
  });
  ngOnInit() {
    this.ngxService.start();
  
    //this.today = new Date();  
    this.fechaDesde = this.pipe.transform(new Date(), 'dd/MM/yyyy');
    this.fechaHasta = this.pipe.transform(new Date(), 'dd/MM/yyyy');
    this.tokenService.validateToken().subscribe(response => {
      this.anioConsult = moment().year();
      this.mesConsult = moment().month() + 1;  
      this.proveedorService.getProveedores().subscribe(proveedores => { this.proveedores = proveedores; });
      this.formapagoService.getFormaPagos().subscribe(formapagos => { this.formaPagos = formapagos; });
      this.tipocomprobanteService.getTipoComprobantes().subscribe(tipocomprobantes => { this.tipoComprobantes = tipocomprobantes; });
     // this.getUltCaja();
      setTimeout(() => {
       //this.getTotalRegistro();
        this.ngxService.stop();
      },2000);
    });
  }

  // getUltCaja(){
  //   this.cajageneralService.getLastRegistrosCaja().subscribe(response=>{
  //     this.saldo = response.saldo; //nunca basarse en este dato.      
  //   });
  // }

 
  
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.form.controls.date.value;
    this.anioConsult = normalizedYear.year();
    ctrlValue.year(normalizedYear.year());
    this.form.controls.date.setValue(ctrlValue);   
    this.saveDisabled = true;
    
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.form.controls.date.value;
    this.mesConsult = normalizedMonth.month() + 1;
    ctrlValue.month(normalizedMonth.month());
    this.form.controls.date.setValue(ctrlValue);   
    this.saveDisabled = false;
    this.conceptoService.getConceptosCaja().subscribe(conceptos => { this.findConceptos = conceptos; });
    datepicker.close();
  }

  getTotalRegistro(){
    this.btnVerTotal = !this.btnVerTotal;
    if (this.btnVerTotal) {
      this.cajageneralService.getSumRegistros().subscribe(response=>{
        this.registroGeneral = response[0];  
        this.textbtnc = 'Ocultar Total General'
        this.iconoc = 'visibility_off';
      });    
    } else {
      this.textbtnc = 'Ver Total General';
      this.iconoc = 'visibility';

    }
  
  }

  // onChangeDateStart(event: MatDatepickerInputEvent<Date>) {
  //   this.fechaDesde = this.pipe.transform(new Date(event.value), 'dd/MM/yyyy');
  // }

  // onChangeDateEnd(event: MatDatepickerInputEvent<Date>) {
  //   let currentYear = this.pipe.transform(new Date(event.value), 'yyyy');
  //   let currentMonth = this.pipe.transform(new Date(event.value), 'MM');
  //   this.fechaHasta = this.pipe.transform(new Date(event.value), 'dd/MM/yyyy');
  //   this.conceptoService.getConceptosCaja().subscribe(conceptos => { this.findConceptos = conceptos; });
  //   this.anio = currentYear;
  //   this.mes = currentMonth;   
  //   if(this.fechaHasta){
  //     this.saveDisabled = false;
  //   }else{
  //     this.saveDisabled = true;
  //   }   
  // }

  getCajaMensualByPeriodo(){   
    let mes = this.mesConsult < 10? '0'+this.mesConsult.toString():this.mesConsult.toString();
    let anio = this.anioConsult.toString();
    let periodo = mes + '/' + anio;
    console.log('periodo', periodo); 
    this.cajamensualService.getCajaMensualByPeriodo(periodo).subscribe(
      response =>{          
           if(response.length > 0){
             this.cajaMensualSelect = response[0];
             this.tienecaja = response[0].id > 0?true:false;              
           }                
      });          
      
  }

  getPeriodoAnterior(){
      this.periodoAnt = [];   
      let mesAnt = (this.mesConsult - 1) < 10? '0'+ (this.mesConsult - 1).toString():(this.mesConsult - 1).toString();
      let anioAnt = this.anioConsult.toString();
      let periodoAnt = mesAnt + '/' + anioAnt;
      this.cajamensualService.getCajaMensualByPeriodoAnt(periodoAnt).subscribe(
        cajaant =>{
          if(cajaant.length > 0){
             this.periodoAnt.push({periodo: cajaant[0]?.periodo,saldoinicio:cajaant[0]?.saldoinicial, ingreso:cajaant[0]?.ingreso, egreso:cajaant[0]?.egreso,saldocierre:cajaant[0]?.saldocierre });
           }else{
              if(this.mesConsult - 1 > 0){
               this.cajageneralService.getRegistrosCajaByMes(periodoAnt).subscribe(
                cajaant =>{                  
                  this.periodoAnt.push({periodo: periodoAnt,saldoinicio:null, ingreso:cajaant[0].ingreso, egreso:cajaant[0].egreso,saldocierre:cajaant[0].neto });
                })          
              }  
           }  
        })          
   
    console.log('this.periodoAnt', this.periodoAnt);

  }


  onChangeDateCaja(event: MatDatepickerInputEvent<Date>) {
    this.newRegistroCaja.fecha = this.pipe.transform(new Date(event.value), 'dd/MM/yyyy');
  }

  changeFindConceptos(concepto_id: number) {
    this.subconceptoService.getSubconceptosByConcepto(concepto_id).subscribe(subconceptos => { this.findSubConceptos = subconceptos; });
  }

  viewRegistrarCaja() {
    this.viewFormulario = !this.viewFormulario;
    if (this.viewFormulario) {
      this.newRegistroCaja = new CajaGeneral();
      this.textbtn = 'Ocultar Formulario'
      this.icono = 'fa fa-minus-circle fa-lg';
    } else {
      this.textbtn = 'Registrar Caja';
      this.icono = 'fa fa-plus fa-lg';

    }
  }

  changeTipoRegistro(tiporegistro_id: number) {
    this.conceptoService.getConceptosByTipoRegistro(tiporegistro_id).subscribe(conceptos => { this.conceptos = conceptos; });
  }

  changeConceptos(concepto_id: number) {
    this.subconceptoService.getSubconceptosByConcepto(concepto_id).subscribe(subconceptos => { this.subConceptos = subconceptos; });
  }

  saveRegistroCaja() {
    this.ngxService.start();   
    this.newRegistroCaja.created_by_id = this.tokenService.currentUserData.id;
    this.newRegistroCaja.created_at = this.pipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
    this.newRegistroCaja.fecha = this.newRegistroCaja.fecha?this.newRegistroCaja.fecha:this.pipe.transform(new Date(), 'yyyy-MM-dd');  
    this.newRegistroCaja.saldo = this.newRegistroCaja.tiporegistro_id == TipoRegistro.INGRESO?Number(this.newRegistroCaja.importe)+Number(this.saldo):Number(this.saldo)-Number(this.newRegistroCaja.importe);   
    this.cajageneralService.createCajaGeneral(this.newRegistroCaja).subscribe(
      registroscaja => {
        this.viewFormulario = false;
        this.newRegistroCaja = new CajaGeneral();      
        this.getCajaMensual(registroscaja.fecha);
       // this.getTotalRegistro();
        setTimeout(() => { //+'<br>PERIODO:'+this.pipe.transform(this.respcajaMensual.fecha, 'MM-yyyy')+'<br>INGRESO: $'+this.respcajaMensual.ingreso+'<br>EGRESO: $'+this.respcajaMensual.egreso+'<br><strong>SALDO: $'+this.respcajaMensual.neto+'</strong>'
          Swal.fire(
            'Registro guardado con éxito!',
            'Nº de Registro:'+registroscaja.id,
            'success'                
          ) 
          this.ngxService.stop(); },1000);
      },
      error => { console.log(error); this.ngxService.stop(); });

  }

  getCajaMensual(fecha: any){    
    this.cajamensualService.getCajaMensualByFecha(fecha).subscribe(arrayMensual=>{ this.respcajaMensual = arrayMensual[0]});

  }

  dialogEliminarRegistro(caja: CajaGeneral) {
    Swal.fire({
      title: 'Esta seguro de eliminar el Registro?',
      text: "Se eliminará el registro con importe $" + caja.importe + ", Subconcepto: " + caja?.subconcepto?.descripcion,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3A6DBC',
      cancelButtonColor: '#879bad',
      confirmButtonText: 'Si, elimiar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (caja.id) {
          caja.activo = false;
          caja.canceled_by_id = this.tokenService.currentUserData.id;
          caja.canceled_at = this.pipe.transform(
            new Date(),
            'dd-MM-yyyy HH:mm:ss'
          );
          this.cajageneralService.updateRegistroCajaCancelar(caja).subscribe(
            response => {
             // this.getTotalCaja();
             this.getRegistrosCaja();
              Swal.fire(
                'Registro eliminado con éxito!',
                '',
                'success'                
              )
            }, error => {
              Swal.fire({
                icon: 'error',
                title: 'Ooops....',
                text: 'No se puede eliminar el registro. Intente nuevamente.',
                footer: ''
              });
            });

        } else {
          Swal.fire({
            icon: 'error',
            title: '',
            text: 'No se puede eliminar el registro.',
            footer: ''
          });
        }
      }
    });
  }

  getRegistrosCaja() {
    this.registrosCaja = [];
    this.tienecaja = false;  
    this.periodoSelect = this.mesConsult + '/' + this.anioConsult; 
    this.totalFindIngreso = this.totalFindEgreso = this.totalFindNeto = 0;
    this.ngxService.start();    
    this.cajageneralService.getRegistrosCajaByFechas(this.periodoSelect, this.findConcepto_id, this.findSubconcepto_id,this.findFormapago_id).subscribe(
      (registroscaja: CajaGeneral[]) => {
        this.getCajaMensualByPeriodo();        
        this.btnExcel = false;
        this.showMyClass = true;
        let singreso = 0; let segreso = 0;
        this.registrosCaja = registroscaja;
        registroscaja.forEach(caja => {
           if(caja.tiporegistro_id == TipoRegistro.INGRESO){
              singreso += caja.importe;
           }else{
            segreso += caja.importe;
           }
        });
       // setTimeout(() => {
        this.getPeriodoAnterior();             
        this.dataSource = new MatTableDataSource(this.registrosCaja);
        this.dataSource.paginator = this.paginator;       
       // });
        setTimeout(()=>{
          if(!this.tienecaja){
            this.totalFindIngreso = singreso;
            this.totalFindEgreso = segreso;
            this.totalFindNeto = this.periodoAnt[0]?.saldocierre?(Number(this.periodoAnt[0].saldocierre)+Number(this.totalFindIngreso)) - Number(this.totalFindEgreso):0;            
          } 
          this.ngxService.stop();  
        },500)
      },
      error => { console.log(error); this.ngxService.stop(); });   
  }

  openDialogRegistroCaja(caja: CajaGeneral) {
    let modalreserva = this.dialogRegistroCaja.open(caja, 'sm');
    modalreserva.then((result) => {
      console.log('result action:');
      console.log(result);

    }, (reason) => {
    //  this.getTotalCaja();
      this. getRegistrosCaja();
      console.log('Dismissed action: ' + reason);
    });
  }

  editarRegistroCaja(caja: CajaGeneral) {
    let modalreserva = this.editarRegistroService.open(caja, 'lg');
    modalreserva.then((result) => {
    //  this.getTotalCaja();
      this. getRegistrosCaja();
      console.log('result action:');
      console.log(result);

    }, (reason) => {
     // this.getTotalCaja();
      this. getRegistrosCaja();
      console.log('Dismissed action: ' + reason);
    });
  }

  getColorEtiqueta(tiporegistro: TipoRegistro) {
    switch (tiporegistro.id) {
      case 1:
        return "estadouno";
      case 2:
        return "estadodos";     
    }
    return "";
  }

  formatNumber(importe:any) {
    return this.formatPipe.transform(importe);
  }

  cargarTemplate(templateid:any) {   
    this.reporteService.get(templateid).subscribe(response => {
      this.template = response;
      const usuario = this.tokenService.currentUserData.apellido + ', ' + this.tokenService.currentUserData.nombre;
      let saldoanterior = this.periodoAnt[0]?.saldocierre?this.periodoAnt[0]?.saldocierre:0;
      this.model = {
        fechaHoy: this.pipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss'),
        periodoAnt: this.periodoAnt[0],
        periodo: this.mesConsult < 10? '0'+this.periodoSelect:this.periodoSelect,       
        usuario: usuario,
        registros: this.registrosCaja,
        ingreso: this.totalFindIngreso?this.formatNumber(Number(saldoanterior)+Number(this.totalFindIngreso.toFixed(2))):Number(this.cajaMensualSelect.ingreso)+Number(this.cajaMensualSelect.saldoinicial),
        egreso: this.totalFindEgreso?this.formatNumber(this.totalFindEgreso.toFixed(2)):this.cajaMensualSelect.egreso,
        neto:  this.totalFindNeto?this.totalFindNeto.toFixed(2):this.cajaMensualSelect.saldocierre      
      };
      this.buttoncaja.template = response;
      this.buttoncaja.generateHtml();
    });
  }

  printCaja($event: string) {
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

  DialogCierreMensual(){
    Swal.fire({
      title: 'Esta seguro de cerrar caja periodo ' +this.periodoSelect+ '?',
      text: "Una vez cerrada la caja, no se podran hacer modificaciones sobre registros del mes seleccionado.",
      icon: 'warning',     
      showCancelButton: true,
      confirmButtonColor: '#3A6DBC',
      cancelButtonColor: '#879bad',
      confirmButtonText: 'Si, Cerrar Caja!'
    }).then((result) => {
      if (result.isConfirmed) {
        let registroids: any = [];
        this.ngxService.start();
        this.cajamensualService.getLastCajaMensual().subscribe(
          response =>{ 
            let lastCmensual = new CajaMensual(); lastCmensual = response;
            this.registrosCaja.forEach(registro => {
               registroids.push(registro.id);
            }); 
            setTimeout(() => {             
              this.cajageneralService.updateRegistrosCajaByMes(registroids,this.tokenService.currentUserData.id).subscribe(
                registros =>{
                    let mes = this.mesConsult < 10? '0'+this.mesConsult.toString():this.mesConsult.toString();
                    let anio = this.anioConsult.toString();
                    let periodo = mes + '/' + anio;
                    let cajaMensual = new CajaMensual();
                    cajaMensual.created_by_id = this.tokenService.currentUserData.id;
                    cajaMensual.periodo =  periodo;
                    cajaMensual.saldoinicial = lastCmensual?.saldocierre?lastCmensual.saldocierre:0;
                    cajaMensual.ingreso = this.totalFindIngreso;
                    cajaMensual.egreso = this.totalFindEgreso;
                    cajaMensual.saldocierre = Number(this.totalFindNeto.toFixed(2));
                    this.cajamensualService.createCajaMensual(cajaMensual).subscribe(respcajamensual=>{
                      Swal.fire(
                        'Datos guardados con éxito!',
                        '',
                        'success'                
                      );
                      this.getRegistrosCaja();
                      this.ngxService.stop();
                    });
                    
                })
            }, 2000);             
             
          });
         
      }    
    });   
  }

  changeComprobante(comprobante_id: number){
     if(comprobante_id == TipoComprobante.RECIBO_INTERNO){
       this.cajageneralService.getLastReciboInterno(comprobante_id).subscribe(
        response=>{this.numerocomprobante = Number(response?.nrocomprobante?response.nrocomprobante:0) + 1;
                   this.newRegistroCaja.nrocomprobante = this.NumConCeros(this.numerocomprobante); 
        });
     }else{
      this.newRegistroCaja.nrocomprobante = null;
     }
  }


  NumConCeros(numeroOrig: number){
    let res = "";
    if(numeroOrig>=10000){
     res = ""+numeroOrig.toString();}
    if(numeroOrig>=1000){
    res = "0"+numeroOrig.toString();}
    if(numeroOrig>=100){
    res = "00"+numeroOrig.toString();}
    if(numeroOrig>=10){
    res = "000"+numeroOrig.toString();}
    if(numeroOrig>=1 || numeroOrig == 0){
    res = "0000"+numeroOrig.toString();}
    return res;
 }


}
