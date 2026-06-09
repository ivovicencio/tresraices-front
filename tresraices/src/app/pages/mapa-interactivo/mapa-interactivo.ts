import { Component, Input, OnInit, signal, computed, AfterViewInit } from '@angular/core';
import { LoteService } from '../../core/services/lote';
import { Lote } from '../../models/lote.models';
import { environment } from '../../../environments/environment';
import { animate } from 'animejs';

interface LoteMap {
  id: number;
  lote_num: string;
  sector: string;
  superficie: string;
  medidas_perimetrales: string;
  estado: 'Disponible' | 'Reservado' | 'Vendido';
  precio: string;
  descripcion: string;
}

interface LoteDef {
  sector: string;
  lote: number;
  superficie: string;
  medidas: number[];
  descripcion: string;
}

const LOTES_DATA: Record<string, LoteDef> = {
  'AP1-1': { sector: 'AP1', lote: 1, superficie: '600.86', medidas: [14.20, 37.46, 22.63, 30.72], descripcion: 'Lote esquinero frente a calle principal del sector AP1.' },
  'AP1-2': { sector: 'AP1', lote: 2, superficie: '602.95', medidas: [22.63, 27.25, 26.32, 25.89], descripcion: 'Lote con acceso directo a servicios.' },
  'AP1-3': { sector: 'AP1', lote: 3, superficie: '603.01', medidas: [26.32, 23.87, 29.56, 22.68], descripcion: 'Terreno de forma regular con buena orientación.' },
  'AP1-4': { sector: 'AP1', lote: 4, superficie: '603.01', medidas: [21.90, 22.68, 29.56, 26.32], descripcion: 'Lote tranquilo al fondo del pasaje.' },
  'AP1-5': { sector: 'AP1', lote: 5, superficie: '602.95', medidas: [25.00, 26.32, 21.90, 25.89], descripcion: 'Lote cercano a espacios verdes.' },
  'AP1-6': { sector: 'AP1', lote: 6, superficie: '589.20', medidas: [20.60, 24.51, 22.63, 30.72], descripcion: 'Excelente relación superficie-precio.' },

  'AP2-1': { sector: 'AP2', lote: 1, superficie: '600.00', medidas: [31.51, 20.38, 34.28, 19.36], descripcion: 'Lote con frente a calle principal.' },
  'AP2-2': { sector: 'AP2', lote: 2, superficie: '602.51', medidas: [36.82, 18.75, 36.82, 17.81], descripcion: 'Terreno amplio y bien proporcionado.' },
  'AP2-3': { sector: 'AP2', lote: 3, superficie: '607.39', medidas: [39.45, 17.62, 39.45, 16.66], descripcion: 'Lote de gran superficie.' },
  'AP2-4': { sector: 'AP2', lote: 4, superficie: '612.58', medidas: [42.44, 16.55, 42.44, 15.51], descripcion: 'Posibilidad de construcción en dos plantas.' },
  'AP2-5': { sector: 'AP2', lote: 5, superficie: '612.58', medidas: [42.44, 15.00, 42.44, 15.00], descripcion: 'Lote con buena iluminación natural.' },
  'AP2-6': { sector: 'AP2', lote: 6, superficie: '604.71', medidas: [39.45, 11.20, 4.90, 39.45, 16.66], descripcion: 'Lote esquinero con formato irregular.' },
  'AP2-7': { sector: 'AP2', lote: 7, superficie: '602.51', medidas: [36.82, 17.20, 36.82, 17.81], descripcion: 'Terreno compacto y funcional.' },
  'AP2-8': { sector: 'AP2', lote: 8, superficie: '606.15', medidas: [31.51, 18.70, 34.28, 19.36], descripcion: 'Lote con frente a calle secundaria.' },

  'AP3-1': { sector: 'AP3', lote: 1, superficie: '653.32', medidas: [43.72, 15.00, 43.44, 15.01], descripcion: 'Lote esquinero con frente a calle principal del sector.' },
  'AP3-2': { sector: 'AP3', lote: 2, superficie: '649.13', medidas: [43.72, 15.00, 43.16, 15.01], descripcion: 'Terreno plano con servicios cercanos.' },
  'AP3-3': { sector: 'AP3', lote: 3, superficie: '644.95', medidas: [43.16, 15.00, 42.88, 15.01], descripcion: 'Excelente ubicación dentro del barrio.' },
  'AP3-4': { sector: 'AP3', lote: 4, superficie: '640.76', medidas: [42.88, 15.00, 42.61, 15.01], descripcion: 'Lote de gran superficie con buena orientación.' },
  'AP3-5': { sector: 'AP3', lote: 5, superficie: '640.76', medidas: [42.61, 15.03, 42.88, 15.01], descripcion: 'Terreno listo para construir.' },
  'AP3-6': { sector: 'AP3', lote: 6, superficie: '644.95', medidas: [42.88, 15.03, 43.16, 15.01], descripcion: 'Lote con potencial de plusvalía.' },
  'AP3-7': { sector: 'AP3', lote: 7, superficie: '649.13', medidas: [43.16, 15.03, 43.44, 15.01], descripcion: 'Cerca de futuros servicios comerciales.' },
  'AP3-8': { sector: 'AP3', lote: 8, superficie: '653.32', medidas: [43.44, 15.03, 43.72, 15.01], descripcion: 'Lote premium con frente a calle principal.' },

  'AP4-1': { sector: 'AP4', lote: 1, superficie: '632.94', medidas: [42.36, 15.00, 42.08, 15.01], descripcion: 'Lote esquinero con acceso rápido.' },
  'AP4-2': { sector: 'AP4', lote: 2, superficie: '628.76', medidas: [42.08, 15.00, 41.80, 15.01], descripcion: 'Terreno de forma regular.' },
  'AP4-3': { sector: 'AP4', lote: 3, superficie: '624.57', medidas: [41.80, 15.00, 41.53, 15.01], descripcion: 'Buena ubicación dentro del barrio.' },
  'AP4-4': { sector: 'AP4', lote: 4, superficie: '620.38', medidas: [41.53, 15.00, 41.25, 15.01], descripcion: 'Lote de superficie equilibrada.' },
  'AP4-5': { sector: 'AP4', lote: 5, superficie: '620.38', medidas: [41.25, 15.03, 41.53, 15.01], descripcion: 'Terreno con buena tierra y drenaje.' },
  'AP4-6': { sector: 'AP4', lote: 6, superficie: '624.57', medidas: [41.53, 15.03, 41.80, 15.01], descripcion: 'Cerca de espacios verdes.' },
  'AP4-7': { sector: 'AP4', lote: 7, superficie: '628.76', medidas: [41.80, 15.03, 42.08, 15.01], descripcion: 'Lote premium del sector.' },
  'AP4-8': { sector: 'AP4', lote: 8, superficie: '632.94', medidas: [42.08, 15.03, 42.36, 15.01], descripcion: 'Frente a plazoleta proyectada.' },

  'AP5-1': { sector: 'AP5', lote: 1, superficie: '612.56', medidas: [41.00, 15.00, 40.72, 15.01], descripcion: 'Lote con frente a calle interna.' },
  'AP5-2': { sector: 'AP5', lote: 2, superficie: '608.38', medidas: [41.00, 15.00, 40.44, 15.01], descripcion: 'Terreno accesible y bien ubicado.' },
  'AP5-3': { sector: 'AP5', lote: 3, superficie: '604.19', medidas: [40.44, 15.00, 40.17, 15.01], descripcion: 'Lote ideal para casa familiar.' },
  'AP5-4': { sector: 'AP5', lote: 4, superficie: '600.00', medidas: [40.17, 15.00, 39.89, 15.01], descripcion: 'Excelente relación calidad-precio.' },
  'AP5-5': { sector: 'AP5', lote: 5, superficie: '600.00', medidas: [39.89, 15.03, 40.17, 15.01], descripcion: 'Lote con servicios a estrenar.' },
  'AP5-6': { sector: 'AP5', lote: 6, superficie: '604.19', medidas: [40.17, 15.03, 40.44, 15.01], descripcion: 'Terreno con inclinación suave.' },
  'AP5-7': { sector: 'AP5', lote: 7, superficie: '608.38', medidas: [40.44, 15.03, 40.72, 15.01], descripcion: 'Lote amplio con buena orientación.' },
  'AP5-8': { sector: 'AP5', lote: 8, superficie: '612.56', medidas: [40.72, 15.03, 41.00, 15.01], descripcion: 'Último lote disponible de la fila.' },

  'AP6-1': { sector: 'AP6', lote: 1, superficie: '995.63', medidas: [15.63, 45.68, 22.43, 39.26], descripcion: 'Lote de gran tamaño, ideal para proyecto familiar.' },
  'AP6-2': { sector: 'AP6', lote: 2, superficie: '600.97', medidas: [15.35, 39.26, 15.35, 39.26], descripcion: 'Lote de forma cuadrada y bien proporcionada.' },
  'AP6-3': { sector: 'AP6', lote: 3, superficie: '600.97', medidas: [15.35, 39.26, 15.35, 39.26], descripcion: 'Terreno regular con acceso a calle.' },
  'AP6-4': { sector: 'AP6', lote: 4, superficie: '600.00', medidas: [40.11, 15.00, 40.11, 15.00], descripcion: 'Lote con frente a calle interna del sector.' },
  'AP6-5': { sector: 'AP6', lote: 5, superficie: '600.00', medidas: [40.11, 15.00, 40.11, 15.00], descripcion: 'Excelente oportunidad de inversión.' },
  'AP6-6': { sector: 'AP6', lote: 6, superficie: '600.00', medidas: [40.11, 15.00, 40.11, 15.00], descripcion: 'Lote accesible desde calle principal.' },
  'AP6-7': { sector: 'AP6', lote: 7, superficie: '600.00', medidas: [40.11, 15.00, 40.11, 15.05], descripcion: 'Terreno con buena iluminación.' },
  'AP6-8': { sector: 'AP6', lote: 8, superficie: '601.80', medidas: [42.87, 15.05, 15.66, 15.66], descripcion: 'Lote con formato particular.' },
  'AP6-9': { sector: 'AP6', lote: 9, superficie: '600.10', medidas: [37.31, 17.67, 18.39, 15.00], descripcion: 'Luce céntrico dentro del loteo.' },
  'AP6-10': { sector: 'AP6', lote: 10, superficie: '600.62', medidas: [30.79, 22.63, 23.55, 22.43], descripcion: 'Lote esquinero del sector AP6.' },
};

function formatMedidas(m: number[]): string {
  return m.map(v => v.toFixed(2).replace('.', ',') + ' m').join(', ');
}

@Component({
  selector: 'app-mapa-interactivo',
  imports: [],
  templateUrl: './mapa-interactivo.html',
  styleUrl: './mapa-interactivo.css',
})
export class MapaInteractivo implements OnInit, AfterViewInit {
  @Input() hideHeader = false;
  lotes = signal<LoteMap[]>([]);
  lotesPorSector = signal<{ sector: string; lotes: LoteMap[] }[]>([]);
  selectedSector = signal<string | null>(null);
  sectores = computed(() => this.lotesPorSector().map(g => g.sector));
  lotesFiltrados = computed(() => {
    const sec = this.selectedSector();
    if (!sec) return this.lotesPorSector();
    return this.lotesPorSector().filter(g => g.sector === sec);
  });

  constructor(private loteService: LoteService) {}

  ngOnInit(): void {
    this.loteService.getLotes({ limit: 50 }).subscribe({
      next: (res) => {
        if (res.status === '1' && res.data) {
          const props = res.data['propiedades'] as Lote[];
          const mapped = props
            .filter(p => p.manzana && p.lote_num)
            .map(p => {
              const key = `${p.manzana}-${p.lote_num}`;
              const def = LOTES_DATA[key];
              return {
                id: p.id,
                lote_num: p.lote_num || '',
                sector: def?.sector || p.manzana || '',
                superficie: def?.superficie || p.superficie || '',
                medidas_perimetrales: def ? formatMedidas(def.medidas) : '',
                estado: p.estado,
                precio: 'Consultar',
                descripcion: def?.descripcion || p.descripcion || '',
              } as LoteMap;
            });
          this.lotes.set(mapped);
          this.agruparPorSector(mapped);
          if (this.sectores().length > 0) {
            this.selectedSector.set(this.sectores()[0]);
          }
        }
      },
      error: () => {
        this.lotes.set([]);
        this.lotesPorSector.set([]);
      },
    });
  }

  ngAfterViewInit() {
    this.animarCards();
  }

  private animarCards() {
    const cards = document.querySelectorAll('.lote-card');
    if (!cards.length) return;
    animate(cards, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 700,
      ease: 'outCubic',
      delay: (_: any, i: number) => i * 80,
    });
  }

  seleccionarSector(sector: string | null) {
    this.selectedSector.set(sector);
    setTimeout(() => this.animarCards(), 50);
  }

  private agruparPorSector(lotes: LoteMap[]): void {
    const ordenSectores = ['AP1', 'AP2', 'AP3', 'AP4', 'AP5', 'AP6'];
    const mapa = new Map<string, LoteMap[]>();
    for (const l of lotes) {
      if (!mapa.has(l.sector)) mapa.set(l.sector, []);
      mapa.get(l.sector)!.push(l);
    }
    const result = ordenSectores
      .filter(s => mapa.has(s))
      .map(s => ({ sector: s, lotes: mapa.get(s)!.sort((a, b) => parseInt(a.lote_num) - parseInt(b.lote_num)) }));
    this.lotesPorSector.set(result);
  }

  selectedLote = signal<LoteMap | null>(null);

  openModal(lote: LoteMap): void {
    this.selectedLote.set(lote);
    document.body.classList.add('modal-open');
  }

  closeModal(): void {
    this.selectedLote.set(null);
    document.body.classList.remove('modal-open');
  }

  consultarLote(lote: LoteMap): void {
    const msg = `Hola, me interesa el Lote ${lote.lote_num} (${lote.sector}) de Tres Raíces.`;
    window.open(`https://wa.me/${environment.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  }
}
