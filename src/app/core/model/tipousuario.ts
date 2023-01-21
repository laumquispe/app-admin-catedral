import { TipoUsuarioPermiso } from './tipousuariopermiso';

export class Tipousuario {
  static ADMINISTRADOR:number = 1; 

 
  id: number | undefined;
  descripcion: string| undefined;
  activo: boolean| undefined;
  tipousuario_permiso: TipoUsuarioPermiso[] = [];

  constructor(data?: any) {
    Object.assign(this, data);
  }
}

