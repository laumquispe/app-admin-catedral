export class Concepto {
   
    id?: number;  
    descripcion!: string;
    tiporegistro_id: number | undefined;
    activo: boolean | undefined;
    created_by_id: number | undefined;
    updated_by_id: number | undefined;
    created_at: string | undefined; 
    updated_at: string | undefined;
}