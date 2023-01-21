import { Injectable } from '@angular/core';
import { CajaGeneral } from '@core/model/cajageneral';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditregistrocajaComponent } from './editregistrocaja.component';

@Injectable({
  providedIn: 'root'
})
export class EditregistrocajaService {

  constructor(private modalService: NgbModal) { }

  public open(
    registroCaja : CajaGeneral,
    dialogSize: 'lg'): Promise<boolean> {
    const modalRef = this.modalService.open(EditregistrocajaComponent, { backdrop: 'static', keyboard: false, size: dialogSize });
    modalRef.componentInstance.registroCaja = registroCaja;   
    return modalRef.result;
  }
}
