export class Permiso {
    id:number | undefined;
    url:string | undefined;
    descripcion:string | undefined;
    opcion:string | undefined;   
    icono: string | undefined;    
    activo:boolean | undefined;   
    constructor(data?:any){
      Object.assign(this, data);
    }
}