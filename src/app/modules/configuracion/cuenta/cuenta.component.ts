import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Concepto } from '@core/model/concepto';
import { Subconcepto } from '@core/model/subconcepto';
import { ConceptoService } from '@core/service/concepto.service';
import { SubconceptoService } from '@core/service/subconcepto.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {


  @Input() cuentaSelect?: Concepto;
  @Input() nuevo?: boolean;

  lstSubconcepto: Subconcepto[] = [];
  lstEditSubconcepto: Subconcepto[] = [];
  lstNewSubconcepto: Subconcepto[] = [];
  newSubconcepto: Subconcepto = new Subconcepto();
  displayedColumns: string[] = ['descripcion', 'acciones'];
  displayedColumnsNew: string[] = ['descripcion', 'acciones'];
  tipoRegistros = [
    { id: 1, name: 'INGRESO' },
    { id: 2, name: 'EGRESO' }
  ];
  @ViewChild('tablesubconceptos', { static: true }) tablesubconceptos!: MatTable<any>;
  @ViewChild('tablenuevos', { static: true }) tablenuevos!: MatTable<any>;


  constructor(
    private activeModal: NgbActiveModal,
    private subconceptoService: SubconceptoService,
    private conceptoService: ConceptoService,
  ) { }

  ngOnInit(): void {
    this.subconceptoService.getAllSubconceptosByConcepto(this.cuentaSelect!.id).subscribe(subconceptos => { this.lstSubconcepto = subconceptos; });
  }




  activar(subconcepto: Subconcepto) {
    subconcepto.activo = !subconcepto.activo;
    const index = this.lstEditSubconcepto.findIndex(
      (x) => x === subconcepto && x.activo === subconcepto.activo
    );
    if (index > -1) {
      this.lstEditSubconcepto[index] = subconcepto;
    } else {
      this.lstEditSubconcepto.push(subconcepto);
    }
    console.log('this.lstEditSubconcepto', this.lstEditSubconcepto)
  }

  eliminarNuevos(subconcepto: Subconcepto) {
    const index = this.lstNewSubconcepto.indexOf(subconcepto, 0);
    if (index > -1) {
      this.lstNewSubconcepto.splice(index, 1);
    }
    this.tablenuevos.renderRows();
  }

  agregarFila() {
    const index = this.lstNewSubconcepto.findIndex(
      (x) => x === this.newSubconcepto
    );
    if (index > -1) {
      this.lstNewSubconcepto[index] = this.newSubconcepto;
    } else {
      this.lstNewSubconcepto.push(this.newSubconcepto);
    }
    this.newSubconcepto = this.lstNewSubconcepto[this.lstNewSubconcepto.length - 1];
  }

  agregarNuevo() {
    this.tablenuevos.renderRows();
    this.newSubconcepto = new Subconcepto();
  }


  guardarCuenta() {
    if (this.nuevo) {
      this.conceptoService.addConcepto(this.cuentaSelect!).subscribe(concepto => {
        if (concepto) {
          if (!!this.lstNewSubconcepto.length) {
            this.lstNewSubconcepto.forEach(element => {
              element.concepto_id = concepto.id;
              this.subconceptoService.addSubconcepto(element).subscribe(response => { });
            });
            setTimeout(() => {             
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Datos guardados con  Éxito.',
                showConfirmButton: false,
                timer: 1500
              });
              this.dismiss();
            });
          }
        }
      });
    } else {
      this.conceptoService.updateConcepto(this.cuentaSelect!).subscribe(response => {
        if (!!this.lstNewSubconcepto.length) {
          this.lstNewSubconcepto.forEach(element => {
            element.concepto_id = this.cuentaSelect!.id;
            this.subconceptoService.addSubconcepto(element).subscribe(response => { });
          });
          this.updateSubconcepto();
        } else {        
            this.updateSubconcepto();     
        }
      });
    }
    setTimeout(() => {     
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Datos guardados con  Éxito.',
        showConfirmButton: false,
        timer: 1500
      });
      this.dismiss();
    });

  }

  updateSubconcepto() {
    if (!!this.lstEditSubconcepto.length) {
      this.lstEditSubconcepto.forEach(element => {
        this.subconceptoService.updateSubconcepto(element).subscribe(response => { });
      });
    }
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
