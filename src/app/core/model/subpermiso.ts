export class Subpermiso {
    id: number;
    url: string;
    descripcion: string;
    opcion: string; 
    activo: boolean;
    permiso_id:number;  

    
    constructor(data?: any) {
        Object.assign(this, data);
      }
}