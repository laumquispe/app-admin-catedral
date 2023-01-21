import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Report } from '@core/model/report';


@Component({
  selector: 'app-button-print',
  templateUrl: './button-print.component.html',
  styleUrls: ['./button-print.component.css']
})
export class ButtonPrintComponent implements OnInit {
  @Input() label = 'Imprimir';
  @Input() tooltip = 'Imprimir';
  @Input() class = 'btn btn-save';
  @Input() icon = 'fa fa-print';
  @Input() viewIcon = false;
  @Input() viewLabel = true;
  @Input() template = new Report();
  @Input() tipoBtn = 0;
  @Input() data: any;
  @Input() disabled = false;
  @Input() loadHtml = true;

  @Output() actionClick = new EventEmitter<any>();
  @Output() actionSave = new EventEmitter<any>();

  showDynamicComponent = false;
  htmlForDC = '';
  constructor() {}

  ngOnInit() {}

  click(e: any) {
    if (this.tipoBtn == 1 || this.tipoBtn == 4) {
      return this.actionSave.emit();
    } else {
      if (this.loadHtml) {
        this.generateHtml();
      }
    }
  }

  generateHtml() {
    this.showDynamicComponent = false;
    setTimeout(() => {
      let auxString = this.template.html || 'Sin template cargado.';
      auxString = auxString.replace(/angular-ngFor/g, '*ngFor');
      auxString = auxString.replace(/angular-ngfor/g, '*ngFor');
      auxString = auxString.replace(/angular-ngIf/g, '*ngIf');
      auxString = auxString.replace(/angular-ngif/g, '*ngIf');
      this.htmlForDC = auxString;
      this.showDynamicComponent = true;
    });
  }

  getTootlTip(): string { return this.tooltip; }

  onlyTextPlain() {
    return this.actionClick.emit(this.template.html);
  }
  generateReport(event: any) {
    return this.actionClick.emit(event);
  }
}
