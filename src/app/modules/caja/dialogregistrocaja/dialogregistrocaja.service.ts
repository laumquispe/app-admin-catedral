import { Injectable } from '@angular/core';
import { CajaGeneral } from '@core/model/cajageneral';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogregistrocajaComponent } from './dialogregistrocaja.component';

@Injectable({
  providedIn: 'root'
})
export class DialogregistrocajaService {

  constructor(private modalService: NgbModal) { }

  public open(
    registroCaja : CajaGeneral,
    dialogSize: 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(DialogregistrocajaComponent, { backdrop: 'static', keyboard: false, size: dialogSize });
    modalRef.componentInstance.registroCaja = registroCaja;   
    return modalRef.result;
  }
}
