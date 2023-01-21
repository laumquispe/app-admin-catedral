
export class Usuario {

  id: number;
  tipousuario_id: number;
  nickname: string;;
  nombre: string;
  apellido: string;
  dni: string; 
  activo: boolean;


  constructor(data?: any) {
    Object.assign(this, data);
  }


}
