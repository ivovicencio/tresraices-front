export interface Lead {
  id: number;
  fecha: string;
  estado: 'Pendiente' | 'Contactado' | 'Cerrado';
  mensaje: string | null;
  cliente_id: number;
  cliente_nombre: string;
  cliente_telefono: string;
  cliente_email: string;
  propiedad_id: number;
  propiedad_titulo: string;
  propiedad_precio: string;
}

export interface CreateLeadRequest {
  nombre: string;
  telefono: string;
  email: string;
  propiedad_id: number;
  mensaje?: string;
}
