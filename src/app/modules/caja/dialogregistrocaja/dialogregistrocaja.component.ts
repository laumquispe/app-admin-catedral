import { Component, Input, OnInit } from '@angular/core';
import { CajaGeneral } from '@core/model/cajageneral';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialogregistrocaja',
  templateUrl: './dialogregistrocaja.component.html',
  styleUrls: ['./dialogregistrocaja.component.css']
})
export class DialogregistrocajaComponent implements OnInit {

  @Input() registroCaja?: CajaGeneral;
  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
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
