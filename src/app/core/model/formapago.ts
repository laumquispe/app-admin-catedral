export class FormaPago {
    static EFECTIVO:number = 1; 
    static TRANSFERENCIA:number = 2; 

    id?: number;
    nombre: string | undefined;
    descripcion: string | undefined; 
    activo: boolean = true;
 }