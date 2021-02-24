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
  nombre: string; //para filtrar por nombre
  vecino_id: number;
  usuario_id: number;
  amistad: number;
}

export interface ColeccionEspecial{
  usuario_id: number;
  itemce_id: string;
}

export interface ItemCE{
  ids: string;
  source: string;
}

export interface Visita{
  usuario_id: string;
  lpa: string;
  mpa: string;
  xpa: string;
  jpa: string;
  vpa: string;
  spa: string;
  dpa: string;
  lpr: string;
  mpr: string;
  xpr: string;
  jpr: string;
  vpr: string;
  spr: string;
  dpr: string;
  last_update: string;
}
