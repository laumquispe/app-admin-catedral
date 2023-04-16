import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularTokenService } from 'angular-token';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editregistrocaja',
  templateUrl: './editregistrocaja.component.html',
  styleUrls: ['./editregistrocaja.component.css']
})
export class EditregistrocajaComponent implements OnInit {

  @Input() registroCaja?: CajaGeneral;

  registroSelect: CajaGeneral = new CajaGeneral();
  formaPagos: FormaPago[] = [];
  tipoComprobantes: TipoComprobante[] = [];
  Proveedores: Proveedor[] = [];
  pipe = new DatePipe('en-US');
  subConceptos: Subconcepto[] = [];
  conceptos: Concepto[] = [];
  constructor(
    private activeModal: NgbActiveModal,
    private cajageneralService: CajageneralService,  
    private tipocomprobanteService: TipocomprobanteService,
    private formapagoService: FormapagoService,
    private proveedorService: ProveedorService,
    private tokenService: AngularTokenService,
    private conceptoService: ConceptoService,
    private subconceptoService: SubconceptoService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {  
     this.ngxService.start();
     this.registroSelect = JSON.parse(JSON.stringify(this.registroCaja));   
     this.proveedorService.getProveedores().subscribe(proveedores => { this.Proveedores = proveedores; });
     this.formapagoService.getFormaPagos().subscribe(formapagos => { this.formaPagos = formapagos; });
     this.tipocomprobanteService.getTipoComprobantes().subscribe(tipocomprobantes => { this.tipoComprobantes = tipocomprobantes; });
     this.conceptoService.getConceptosByTipoRegistro(this.registroSelect.tiporegistro_id).subscribe(conceptos => { this.conceptos = conceptos; });
     this.subconceptoService.getSubconceptosByConcepto(this.registroSelect.concepto_id).subscribe(subconceptos => { this.subConceptos = subconceptos; });
     setTimeout(() => {    
       this.ngxService.stop();
     });
  }

  changeConceptos(concepto_id: number) {
    this.subconceptoService.getSubconceptosByConcepto(concepto_id).subscribe(subconceptos => { this.subConceptos = subconceptos; });
  }

  editRegistroCaja(){
     this.registroSelect.updated_by_id = this.tokenService.currentUserData.id;
     this.registroSelect.updated_at = this.pipe.transform(
      new Date(),
      'dd-MM-yyyy HH:mm:ss'
    );
    this.cajageneralService.updateRegistroCaja(this.registroSelect).subscribe(
      response =>{
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Registro editado con Éxito.',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.activeModal.dismiss();

      },error =>{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'No se pudo editar. Vuelva a intentar nuevamente.',
                  footer: ''
                });
                this.activeModal.dismiss();
      });
  }


  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
