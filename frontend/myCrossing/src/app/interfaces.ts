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
  }
