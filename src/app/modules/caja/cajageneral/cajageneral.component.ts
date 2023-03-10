import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
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
@Component({
  selector: 'app-cajageneral',
  templateUrl: './cajageneral.component.html',
  styleUrls: ['./cajageneral.component.css'],
  providers: [NumberFormatPipe]
})
export class CajageneralComponent implements OnInit {
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
  displayedColumnsCaja: string[] = ['numregistro','fecha', 'concepto', 'subconcepto', 'formapago', 'importe', 'acciones'];
  displayedColumns: string[] = ['numregistro','fecha','tiporegistro', 'concepto', 'subconcepto', 'descripcion', 'formapago', 'ingreso','egreso'];
  @ViewChild('buttoncaja', { static: false }) buttoncaja!: ButtonPrintComponent;
  template: Report = new Report(); model:any;
  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  constructor(
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
    private reporteService: ReporteService
  ) { }

  ngOnInit() {
    this.ngxService.start();
    this.today = new Date();
    this.fechaDesde = this.pipe.transform(new Date(), 'dd/MM/yyyy');
    this.fechaHasta = this.pipe.transform(new Date(), 'dd/MM/yyyy');
    this.tokenService.validateToken().subscribe(response => {
      this.proveedorService.getProveedores().subscribe(proveedores => { this.proveedores = proveedores; });
      this.formapagoService.getFormaPagos().subscribe(formapagos => { this.formaPagos = formapagos; });
      this.tipocomprobanteService.getTipoComprobantes().subscribe(tipocomprobantes => { this.tipoComprobantes = tipocomprobantes; });
      this.getUltCaja();
      setTimeout(() => {
       this.getTotalRegistro();
        this.ngxService.stop();
      },2000);
    });
  }

  getUltCaja(){
    this.cajageneralService.getLastRegistrosCaja().subscribe(response=>{
      this.saldo = response.saldo; //nunca basarse en este dato.      
    });
  }

  getTotalRegistro(){
    this.cajageneralService.getSumRegistros().subscribe(response=>{
      this.registroGeneral = response[0];  
         
    });
  }

  onChangeDateStart(event: MatDatepickerInputEvent<Date>) {
    this.fechaDesde = this.pipe.transform(new Date(event.value), 'dd/MM/yyyy');
  }

  onChangeDateEnd(event: MatDatepickerInputEvent<Date>) {
    this.fechaHasta = this.pipe.transform(new Date(event.value), 'dd/MM/yyyy');
    this.conceptoService.getConceptosCaja().subscribe(conceptos => { this.findConceptos = conceptos; });
    if(this.fechaHasta){
      this.saveDisabled = false;
    }else{
      this.saveDisabled = true;
    }   
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
        this.getUltCaja();
        this.getTotalRegistro();
        setTimeout(() => { 
          Swal.fire(
            'Registro guardado con ??xito!',
            'N?? de Registro:'+registroscaja.id,
            'success'                
          )
          this.ngxService.stop(); });
      },
      error => { console.log(error); this.ngxService.stop(); });

  }

  dialogEliminarRegistro(caja: CajaGeneral) {
    Swal.fire({
      title: 'Esta seguro de eliminar el Registro?',
      text: "Se eliminar?? el registro con importe $" + caja.importe + ", Subconcepto: " + caja?.subconcepto?.descripcion,
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
                'Registro eliminado con ??xito!',
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
    this.ngxService.start();    
    this.cajageneralService.getRegistrosCajaByFechas(this.fechaDesde, this.fechaHasta, this.findConcepto_id, this.findSubconcepto_id,this.findFormapago_id).subscribe(
      (registroscaja: CajaGeneral[]) => {
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
        setTimeout(() => {
        this.totalFindIngreso = singreso;
        this.totalFindEgreso = segreso;
        this.totalFindNeto = this.totalFindIngreso - this.totalFindEgreso;
        this.dataSource = new MatTableDataSource(this.registrosCaja);
        this.dataSource.paginator = this.paginator;
        this.ngxService.stop();
      },500);
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
      this.model = {
        fechaHoy: this.pipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss'),
        fechadesde: this.fechaDesde,
        fechahasta: this.fechaHasta,
        usuario: usuario,
        registros: this.registrosCaja,
        ingreso: this.formatNumber(this.totalFindIngreso),
        egreso: this.formatNumber(this.totalFindEgreso),
        neto: this.formatNumber(this.registroGeneral.neto),        
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


}
