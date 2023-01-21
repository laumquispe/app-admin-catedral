
import { Permiso } from './permiso';
import { TipousuarioSubpermiso } from './tipousuariosubpermiso';

export class TipoUsuarioPermiso {
  id: number | undefined;
  tipousuario_id:number | undefined;
  permiso_id:number | undefined;
  permiso!: Permiso;
  permisourl:string | undefined;
  permisodescripcion:string | undefined;
  permisoopcion:string | undefined;
  permisoicono:string | undefined;
  permisoid: number | undefined;

  subpermisos!: TipousuarioSubpermiso[];

  constructor(data?: any) {
    Object.assign(this, data);
  }
 
}



