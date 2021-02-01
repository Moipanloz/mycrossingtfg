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
  id_switch: number;
  id_suenyo: number;
  apodo_aldeano: string;
  }

export interface Vecino{
  nombre: string; //para filtrar por nombre
  vecino_id: number;
  usuario_id: number;
  amistad: number;
}
