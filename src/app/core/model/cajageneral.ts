import { Concepto } from './concepto';

import { TipoComprobante } from './tipocomprobante';
import { TipoRegistro } from './tiporegistro';
import { FormaPago } from './formapago';

import { Subconcepto } from './subconcepto';
import { Proveedor } from './proveedor';


export class CajaGeneral {
    id?: number;
    fecha?: string | null;
    tiporegistro?: TipoRegistro;
    tiporegistro_id?: number;
    proveedor_id?: number ;
    concepto!: Concepto;
    concepto_id!: number;
    subconcepto!: Subconcepto;
    subconcepto_id!: number;
    tipocomprobante!: TipoComprobante;
    tipocomprobante_id!: number;
    nrocomprobante!: string;
    nroordenpago!: string;
    proveedor!: Proveedor;
    formapago!: FormaPago;
    formapago_id!: number;   
    importe!: number;
    observacion!: string; 
    activo?: boolean;  
    created_by_id?: number;
    updated_by_id?: number;
    created_at?: string | null;
    updated_at?: string | null;
    createdregistro?: string;
    updatedregistro?: string;
    canceled_at?: string | null;
    canceled_by_id?:number; 
    saldo! :number;   
  }
  