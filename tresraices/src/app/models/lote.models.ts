export interface Lote {
  id: number;
  titulo: string;
  descripcion: string | null;
  precio: string;
  estado: 'Disponible' | 'Reservado' | 'Vendido';
  superficie: string | null;
  ubicacion: string | null;
  manzana: string | null;
  lote_num: string | null;
  inmobiliaria_id: number | null;
  created_at: string;
  inmobiliaria_nombre?: string;
  inmobiliaria_direccion?: string;
}
