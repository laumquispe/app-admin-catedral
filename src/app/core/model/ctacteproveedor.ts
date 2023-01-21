import { Proveedor } from "./proveedor";

export class ctaCteProveedor {
   
    id?: number;  
    ingreso?: number;
    egreso?: number;
    proveedor_id?: number;
    proveedor?: Proveedor;
    activo?: boolean;
    created_by_id?: number;
    updated_by_id?: number;
    canceled_by_id?: number;
    canceled_at:string | undefined; 
    created_at: string | undefined; 
    updated_at: string | undefined;
}