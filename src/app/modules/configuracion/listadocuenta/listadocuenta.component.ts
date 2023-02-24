import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Concepto } from '@core/model/concepto';
import { ConceptoService } from '@core/service/concepto.service';
import { AngularTokenService } from 'angular-token';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CuentaService } from '../cuenta/cuenta.service';
import Swal from 'sweetalert2';
import { SubconceptoService } from '@core/service/subconcepto.service';
@Component({
  selector: 'app-listadocuenta',
  templateUrl: './listadocuenta.component.html',
  styleUrls: ['./listadocuenta.component.css']
})
export class ListadocuentaComponent implements OnInit {
  lstCuentas: any;
  valor: string = '';
  sinresultados: boolean = false;
  openFormMedico: boolean = false;
  mpExiste: boolean = false;
  conceptoSelect:Concepto = new Concepto();

  // variables paginacion 
  pageIndex: number = 0;
  pageSize: number = 10;
  length: number = 0;

  textbtn = 'Nueva Cuenta';
  icono = 'add_circle';

  dspColumns: string[] = ['numero', 'cuenta', 'acciones'];
  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;
  constructor(   
    private tokenService: AngularTokenService,
    private ngxService: NgxUiLoaderService,   
    private conceptoService: ConceptoService,
    private modelCuentaService: CuentaService,
    private subconceptoService: SubconceptoService,
  ) { }

  ngOnInit(): void {
    this.ngxService.start();   
    this.tokenService.validateToken().subscribe(response => {
      this.listadoCuentas();
      setTimeout(() => {
        this.ngxService.stop();
      },2000);
    });

  }

  listadoCuentas(){
    this.conceptoService.getConceptosCaja().subscribe(conceptos=>{ 
      this.lstCuentas = new MatTableDataSource(conceptos);
      this.lstCuentas.paginator = this.paginator;
    });
  }



  estadoCuenta(cuenta: Concepto){
    let mensaje = cuenta.activo?'inactivar':'activar';
    Swal.fire({
      title: 'Actualizar Estado',
      text: "Se esta por " +mensaje+" la cuenta: " + cuenta.descripcion,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
      confirmButtonColor: '#3A6DBC',
      cancelButtonColor: '#879bad',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {
        cuenta.activo = cuenta.activo?false:true;
        this.conceptoService.updateConcepto(cuenta).subscribe(
          cuenta => {
            this.updateSubconceptos(cuenta);
            this.listadoCuentas();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Actualizado con exito',
              showConfirmButton: false,
              timer: 1500
            })
          },
          error => {
          }
        );
      }
    })
  }

  updateSubconceptos(cuenta:Concepto){
     this.subconceptoService.updateByConcepto(cuenta.id,cuenta.activo).subscribe(response=>{});
  }

  filtrarDatos(event:any){    
      const val = event.target.value;
      if (val) {
        this.lstCuentas.filter = val.trim().toLowerCase();
      } else {
        this.listadoCuentas();
      }
    
  }
 
  editarCuenta(cuenta: Concepto | null,nuevo:boolean){
    let cuentaSelect = cuenta? cuenta: new Concepto();
    let modalreserva = this.modelCuentaService.open(cuentaSelect,nuevo, 'lg');
    modalreserva.then((result) => {   
      console.log('result action:');
      console.log(result);

    }, (reason) => {    
      console.log('Dismissed action: ' + reason);
    });
  }


}
