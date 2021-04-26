import { CalendarEvent } from 'angular-calendar';
export interface Tarea{
  id: number;
  usuario_id: number;
  hecha: boolean;
  imagen_url: string;
}

export interface User{
  id: number;
  nombre: string;
  isla: string;
  fruta: string;
  cumpleanyos: Date;
  hemisferio: string;
  contrasenya: string;
  email: string;
  verification: string;
  id_switch: string;
  id_suenyo: string;
  apodo_aldeano: string;
}

export interface Vecino{
  nombre: string;
  vecino_id: string;
  usuario_id: number;
  amistad: number;
  cumple: Date;
  personalidad: string;
  especie: string;
  genero: string;
  imgIcon: string;
  imgPhoto: string;
}

export interface ColeccionEspecial{
  usuario_id: number;
  item_name: string;
  item_source: string;
}

export interface Visita{
  usuario_id: string;
  lpa: string;
  mpa: string;
  xpa: string;
  jpa: string;
  vpa: string;
  lpr: string;
  mpr: string;
  xpr: string;
  jpr: string;
  vpr: string;
  estela: boolean;
  last_update: string;
}

export interface Fosil{
  nombre_fosil : string;
  usuario_id : number;
}

export interface Cancion{
  nombre_cancion : string;
  usuario_id : number;
}

export interface Bicho{
  nombre_criatura : string;
  usuario_id : number;
}

export interface Pez{
  nombre_criatura : string;
  usuario_id : number;
}

export interface CriaturaMarina{
  nombre_criatura : string;
  usuario_id : number;
}

export interface Foto{
  usuario_id : number;
  url_image : String;
}

export interface Arte{
  nombre_arte : string;
  usuario_id : number;
}
