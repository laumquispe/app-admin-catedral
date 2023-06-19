export class TipoComprobante {
    static RECIBO_INTERNO = 4;


    id: number = 0;
    descripcion: string | undefined; 
    abreviacion: string | undefined;   
    activo: boolean = true;
  
}    