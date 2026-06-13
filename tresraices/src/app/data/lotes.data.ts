export interface LoteData {
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
  points?: string | null;
}

export const LOTES: LoteData[] = [
  // ── Sector AP1 (6 lotes) ──
  { id: 1, titulo: 'Lote 1 - Sector AP1', descripcion: 'Lote esquinero frente a calle principal del sector AP1.', precio: '1', estado: 'Disponible', superficie: '600.86', ubicacion: '-31.4167,-64.1833', manzana: 'AP1', lote_num: '1', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 2, titulo: 'Lote 2 - Sector AP1', descripcion: 'Lote con acceso directo a servicios.', precio: '1', estado: 'Disponible', superficie: '602.95', ubicacion: '-31.4168,-64.1834', manzana: 'AP1', lote_num: '2', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 3, titulo: 'Lote 3 - Sector AP1', descripcion: 'Terreno de forma regular con buena orientación.', precio: '1', estado: 'Disponible', superficie: '603.01', ubicacion: '-31.4169,-64.1835', manzana: 'AP1', lote_num: '3', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 4, titulo: 'Lote 4 - Sector AP1', descripcion: 'Lote tranquilo al fondo del pasaje.', precio: '1', estado: 'Disponible', superficie: '603.01', ubicacion: '-31.4170,-64.1836', manzana: 'AP1', lote_num: '4', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 5, titulo: 'Lote 5 - Sector AP1', descripcion: 'Lote cercano a espacios verdes.', precio: '1', estado: 'Disponible', superficie: '602.95', ubicacion: '-31.4171,-64.1837', manzana: 'AP1', lote_num: '5', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 6, titulo: 'Lote 6 - Sector AP1', descripcion: 'Excelente relación superficie-precio.', precio: '1', estado: 'Disponible', superficie: '589.20', ubicacion: '-31.4172,-64.1838', manzana: 'AP1', lote_num: '6', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },

  // ── Sector AP2 (8 lotes) ──
  { id: 7, titulo: 'Lote 1 - Sector AP2', descripcion: 'Lote con frente a calle principal.', precio: '1', estado: 'Disponible', superficie: '600.00', ubicacion: '-31.4173,-64.1839', manzana: 'AP2', lote_num: '1', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 8, titulo: 'Lote 2 - Sector AP2', descripcion: 'Terreno amplio y bien proporcionado.', precio: '1', estado: 'Disponible', superficie: '602.51', ubicacion: '-31.4174,-64.1840', manzana: 'AP2', lote_num: '2', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 9, titulo: 'Lote 3 - Sector AP2', descripcion: 'Lote de gran superficie.', precio: '1', estado: 'Disponible', superficie: '607.39', ubicacion: '-31.4175,-64.1841', manzana: 'AP2', lote_num: '3', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 10, titulo: 'Lote 4 - Sector AP2', descripcion: 'Posibilidad de construcción en dos plantas.', precio: '1', estado: 'Disponible', superficie: '612.58', ubicacion: '-31.4176,-64.1842', manzana: 'AP2', lote_num: '4', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 11, titulo: 'Lote 5 - Sector AP2', descripcion: 'Lote con buena iluminación natural.', precio: '1', estado: 'Disponible', superficie: '612.58', ubicacion: '-31.4177,-64.1843', manzana: 'AP2', lote_num: '5', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 12, titulo: 'Lote 6 - Sector AP2', descripcion: 'Lote esquinero con formato irregular.', precio: '1', estado: 'Disponible', superficie: '604.71', ubicacion: '-31.4178,-64.1844', manzana: 'AP2', lote_num: '6', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 13, titulo: 'Lote 7 - Sector AP2', descripcion: 'Terreno compacto y funcional.', precio: '1', estado: 'Disponible', superficie: '602.51', ubicacion: '-31.4179,-64.1845', manzana: 'AP2', lote_num: '7', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 14, titulo: 'Lote 8 - Sector AP2', descripcion: 'Lote con frente a calle secundaria.', precio: '1', estado: 'Disponible', superficie: '606.15', ubicacion: '-31.4180,-64.1846', manzana: 'AP2', lote_num: '8', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },

  // ── Sector AP3 (8 lotes) ──
  { id: 15, titulo: 'Lote 1 - Sector AP3', descripcion: 'Lote esquinero con frente a calle principal del sector.', precio: '1', estado: 'Disponible', superficie: '653.32', ubicacion: '-31.4181,-64.1847', manzana: 'AP3', lote_num: '1', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 16, titulo: 'Lote 2 - Sector AP3', descripcion: 'Terreno plano con servicios cercanos.', precio: '1', estado: 'Disponible', superficie: '649.13', ubicacion: '-31.4182,-64.1848', manzana: 'AP3', lote_num: '2', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 17, titulo: 'Lote 3 - Sector AP3', descripcion: 'Excelente ubicación dentro del barrio.', precio: '1', estado: 'Disponible', superficie: '644.95', ubicacion: '-31.4183,-64.1849', manzana: 'AP3', lote_num: '3', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 18, titulo: 'Lote 4 - Sector AP3', descripcion: 'Lote de gran superficie con buena orientación.', precio: '1', estado: 'Disponible', superficie: '640.76', ubicacion: '-31.4184,-64.1850', manzana: 'AP3', lote_num: '4', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 19, titulo: 'Lote 5 - Sector AP3', descripcion: 'Terreno listo para construir.', precio: '1', estado: 'Disponible', superficie: '640.76', ubicacion: '-31.4185,-64.1851', manzana: 'AP3', lote_num: '5', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 20, titulo: 'Lote 6 - Sector AP3', descripcion: 'Lote con potencial de plusvalía.', precio: '1', estado: 'Disponible', superficie: '644.95', ubicacion: '-31.4186,-64.1852', manzana: 'AP3', lote_num: '6', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 21, titulo: 'Lote 7 - Sector AP3', descripcion: 'Cerca de futuros servicios comerciales.', precio: '1', estado: 'Disponible', superficie: '649.13', ubicacion: '-31.4187,-64.1853', manzana: 'AP3', lote_num: '7', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 22, titulo: 'Lote 8 - Sector AP3', descripcion: 'Lote premium con frente a calle principal.', precio: '1', estado: 'Disponible', superficie: '653.32', ubicacion: '-31.4188,-64.1854', manzana: 'AP3', lote_num: '8', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },

  // ── Sector AP4 (8 lotes) ──
  { id: 23, titulo: 'Lote 1 - Sector AP4', descripcion: 'Lote esquinero con acceso rápido.', precio: '1', estado: 'Disponible', superficie: '632.94', ubicacion: '-31.4189,-64.1855', manzana: 'AP4', lote_num: '1', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 24, titulo: 'Lote 2 - Sector AP4', descripcion: 'Terreno de forma regular.', precio: '1', estado: 'Disponible', superficie: '628.76', ubicacion: '-31.4190,-64.1856', manzana: 'AP4', lote_num: '2', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 25, titulo: 'Lote 3 - Sector AP4', descripcion: 'Buena ubicación dentro del barrio.', precio: '1', estado: 'Disponible', superficie: '624.57', ubicacion: '-31.4191,-64.1857', manzana: 'AP4', lote_num: '3', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 26, titulo: 'Lote 4 - Sector AP4', descripcion: 'Lote de superficie equilibrada.', precio: '1', estado: 'Disponible', superficie: '620.38', ubicacion: '-31.4192,-64.1858', manzana: 'AP4', lote_num: '4', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 27, titulo: 'Lote 5 - Sector AP4', descripcion: 'Terreno con buena tierra y drenaje.', precio: '1', estado: 'Disponible', superficie: '620.38', ubicacion: '-31.4193,-64.1859', manzana: 'AP4', lote_num: '5', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 28, titulo: 'Lote 6 - Sector AP4', descripcion: 'Cerca de espacios verdes.', precio: '1', estado: 'Disponible', superficie: '624.57', ubicacion: '-31.4194,-64.1860', manzana: 'AP4', lote_num: '6', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 29, titulo: 'Lote 7 - Sector AP4', descripcion: 'Lote premium del sector.', precio: '1', estado: 'Disponible', superficie: '628.76', ubicacion: '-31.4195,-64.1861', manzana: 'AP4', lote_num: '7', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 30, titulo: 'Lote 8 - Sector AP4', descripcion: 'Frente a plazoleta proyectada.', precio: '1', estado: 'Disponible', superficie: '632.94', ubicacion: '-31.4196,-64.1862', manzana: 'AP4', lote_num: '8', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },

  // ── Sector AP5 (8 lotes) ──
  { id: 31, titulo: 'Lote 1 - Sector AP5', descripcion: 'Lote con frente a calle interna.', precio: '1', estado: 'Disponible', superficie: '612.56', ubicacion: '-31.4197,-64.1863', manzana: 'AP5', lote_num: '1', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 32, titulo: 'Lote 2 - Sector AP5', descripcion: 'Terreno accesible y bien ubicado.', precio: '1', estado: 'Disponible', superficie: '608.38', ubicacion: '-31.4198,-64.1864', manzana: 'AP5', lote_num: '2', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 33, titulo: 'Lote 3 - Sector AP5', descripcion: 'Lote ideal para casa familiar.', precio: '1', estado: 'Disponible', superficie: '604.19', ubicacion: '-31.4199,-64.1865', manzana: 'AP5', lote_num: '3', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 34, titulo: 'Lote 4 - Sector AP5', descripcion: 'Excelente relación calidad-precio.', precio: '1', estado: 'Disponible', superficie: '600.00', ubicacion: '-31.4200,-64.1866', manzana: 'AP5', lote_num: '4', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 35, titulo: 'Lote 5 - Sector AP5', descripcion: 'Lote con servicios a estrenar.', precio: '1', estado: 'Disponible', superficie: '600.00', ubicacion: '-31.4201,-64.1867', manzana: 'AP5', lote_num: '5', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 36, titulo: 'Lote 6 - Sector AP5', descripcion: 'Terreno con inclinación suave.', precio: '1', estado: 'Disponible', superficie: '604.19', ubicacion: '-31.4202,-64.1868', manzana: 'AP5', lote_num: '6', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 37, titulo: 'Lote 7 - Sector AP5', descripcion: 'Lote amplio con buena orientación.', precio: '1', estado: 'Disponible', superficie: '608.38', ubicacion: '-31.4203,-64.1869', manzana: 'AP5', lote_num: '7', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 38, titulo: 'Lote 8 - Sector AP5', descripcion: 'Último lote disponible de la fila.', precio: '1', estado: 'Disponible', superficie: '612.56', ubicacion: '-31.4204,-64.1870', manzana: 'AP5', lote_num: '8', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },

  // ── Sector AP6 (10 lotes) ──
  { id: 39, titulo: 'Lote 1 - Sector AP6', descripcion: 'Lote de gran tamaño, ideal para proyecto familiar.', precio: '1', estado: 'Disponible', superficie: '995.63', ubicacion: '-31.4205,-64.1871', manzana: 'AP6', lote_num: '1', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 40, titulo: 'Lote 2 - Sector AP6', descripcion: 'Lote de forma cuadrada y bien proporcionada.', precio: '1', estado: 'Disponible', superficie: '600.97', ubicacion: '-31.4206,-64.1872', manzana: 'AP6', lote_num: '2', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 41, titulo: 'Lote 3 - Sector AP6', descripcion: 'Terreno regular con acceso a calle.', precio: '1', estado: 'Disponible', superficie: '600.97', ubicacion: '-31.4207,-64.1873', manzana: 'AP6', lote_num: '3', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 42, titulo: 'Lote 4 - Sector AP6', descripcion: 'Lote con frente a calle interna del sector.', precio: '1', estado: 'Disponible', superficie: '600.00', ubicacion: '-31.4208,-64.1874', manzana: 'AP6', lote_num: '4', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 43, titulo: 'Lote 5 - Sector AP6', descripcion: 'Excelente oportunidad de inversión.', precio: '1', estado: 'Disponible', superficie: '600.00', ubicacion: '-31.4209,-64.1875', manzana: 'AP6', lote_num: '5', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 44, titulo: 'Lote 6 - Sector AP6', descripcion: 'Lote accesible desde calle principal.', precio: '1', estado: 'Disponible', superficie: '600.00', ubicacion: '-31.4210,-64.1876', manzana: 'AP6', lote_num: '6', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 45, titulo: 'Lote 7 - Sector AP6', descripcion: 'Terreno con buena iluminación.', precio: '1', estado: 'Disponible', superficie: '600.00', ubicacion: '-31.4211,-64.1877', manzana: 'AP6', lote_num: '7', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 46, titulo: 'Lote 8 - Sector AP6', descripcion: 'Lote con formato particular.', precio: '1', estado: 'Disponible', superficie: '601.80', ubicacion: '-31.4212,-64.1878', manzana: 'AP6', lote_num: '8', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 47, titulo: 'Lote 9 - Sector AP6', descripcion: 'Luce céntrico dentro del loteo.', precio: '1', estado: 'Disponible', superficie: '600.10', ubicacion: '-31.4213,-64.1879', manzana: 'AP6', lote_num: '9', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
  { id: 48, titulo: 'Lote 10 - Sector AP6', descripcion: 'Lote esquinero del sector AP6.', precio: '1', estado: 'Disponible', superficie: '600.62', ubicacion: '-31.4214,-64.1880', manzana: 'AP6', lote_num: '10', inmobiliaria_id: 1, created_at: '2026-01-01T00:00:00.000Z', inmobiliaria_nombre: 'Tres Raíces Propiedades', inmobiliaria_direccion: 'Av. Principal 123, Ciudad' },
];

const MEDIDAS: Record<string, number[]> = {
  'AP1-1': [14.20, 37.46, 22.63, 30.72],
  'AP1-2': [22.63, 27.25, 26.32, 25.89],
  'AP1-3': [26.32, 23.87, 29.56, 22.68],
  'AP1-4': [21.90, 22.68, 29.56, 26.32],
  'AP1-5': [25.00, 26.32, 21.90, 25.89],
  'AP1-6': [20.60, 24.51, 22.63, 30.72],
  'AP2-1': [31.51, 20.38, 34.28, 19.36],
  'AP2-2': [36.82, 18.75, 36.82, 17.81],
  'AP2-3': [39.45, 17.62, 39.45, 16.66],
  'AP2-4': [42.44, 16.55, 42.44, 15.51],
  'AP2-5': [42.44, 15.00, 42.44, 15.00],
  'AP2-6': [39.45, 11.20, 4.90, 39.45, 16.66],
  'AP2-7': [36.82, 17.20, 36.82, 17.81],
  'AP2-8': [31.51, 18.70, 34.28, 19.36],
  'AP3-1': [43.72, 15.00, 43.44, 15.01],
  'AP3-2': [43.72, 15.00, 43.16, 15.01],
  'AP3-3': [43.16, 15.00, 42.88, 15.01],
  'AP3-4': [42.88, 15.00, 42.61, 15.01],
  'AP3-5': [42.61, 15.03, 42.88, 15.01],
  'AP3-6': [42.88, 15.03, 43.16, 15.01],
  'AP3-7': [43.16, 15.03, 43.44, 15.01],
  'AP3-8': [43.44, 15.03, 43.72, 15.01],
  'AP4-1': [42.36, 15.00, 42.08, 15.01],
  'AP4-2': [42.08, 15.00, 41.80, 15.01],
  'AP4-3': [41.80, 15.00, 41.53, 15.01],
  'AP4-4': [41.53, 15.00, 41.25, 15.01],
  'AP4-5': [41.25, 15.03, 41.53, 15.01],
  'AP4-6': [41.53, 15.03, 41.80, 15.01],
  'AP4-7': [41.80, 15.03, 42.08, 15.01],
  'AP4-8': [42.08, 15.03, 42.36, 15.01],
  'AP5-1': [41.00, 15.00, 40.72, 15.01],
  'AP5-2': [41.00, 15.00, 40.44, 15.01],
  'AP5-3': [40.44, 15.00, 40.17, 15.01],
  'AP5-4': [40.17, 15.00, 39.89, 15.01],
  'AP5-5': [39.89, 15.03, 40.17, 15.01],
  'AP5-6': [40.17, 15.03, 40.44, 15.01],
  'AP5-7': [40.44, 15.03, 40.72, 15.01],
  'AP5-8': [40.72, 15.03, 41.00, 15.01],
  'AP6-1': [15.63, 45.68, 22.43, 39.26],
  'AP6-2': [15.35, 39.26, 15.35, 39.26],
  'AP6-3': [15.35, 39.26, 15.35, 39.26],
  'AP6-4': [40.11, 15.00, 40.11, 15.00],
  'AP6-5': [40.11, 15.00, 40.11, 15.00],
  'AP6-6': [40.11, 15.00, 40.11, 15.00],
  'AP6-7': [40.11, 15.00, 40.11, 15.05],
  'AP6-8': [42.87, 15.05, 15.66, 15.66],
  'AP6-9': [37.31, 17.67, 18.39, 15.00],
  'AP6-10': [30.79, 22.63, 23.55, 22.43],
};

export function getMedidas(manzana: string, loteNum: string): number[] | undefined {
  return MEDIDAS[`${manzana}-${loteNum}`];
}

export function formatMedidas(m: number[]): string {
  return m.map(v => v.toFixed(2).replace('.', ',') + ' m').join(', ');
}
