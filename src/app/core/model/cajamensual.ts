
export class CajaMensual {
    id!: number;
    periodo!: string;
    saldoinicial!: number;
    ingreso!: number;
    egreso!:number;
    saldocierre!: number;   
    created_by_id?: number;
    updated_by_id?: number;
    created_at?: string | null;
    updated_at?: string | null;   
  }