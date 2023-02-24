import { Injectable } from '@angular/core';
import { Concepto } from '@core/model/concepto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CuentaComponent } from './cuenta.component';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private modalService: NgbModal) { }

  public open(
    cuentaSelect : Concepto,
    nuevo: boolean,
    dialogSize: 'lg'): Promise<boolean> {
    const modalRef = this.modalService.open(CuentaComponent, { backdrop: 'static', keyboard: false, size: dialogSize });
    modalRef.componentInstance.cuentaSelect = cuentaSelect;   
    modalRef.componentInstance.nuevo = nuevo; 
    return modalRef.result;
  }
}
