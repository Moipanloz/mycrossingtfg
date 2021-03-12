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
