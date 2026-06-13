import { Component, Input, OnInit, signal, computed, AfterViewInit } from '@angular/core';
import { LoteService } from '../../core/services/lote';
import { LoteData } from '../../data/lotes.data';
import { environment } from '../../../environments/environment';
import { getMedidas, formatMedidas } from '../../data/lotes.data';
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
          const props = res.data['propiedades'] as LoteData[];
          const mapped = props
            .filter(p => p.manzana && p.lote_num)
            .map(p => {
              const medidas = getMedidas(p.manzana!, p.lote_num!);
              return {
                id: p.id,
                lote_num: p.lote_num || '',
                sector: p.manzana || '',
                superficie: p.superficie || '',
                medidas_perimetrales: medidas ? formatMedidas(medidas) : '',
                estado: p.estado,
                precio: 'Consultar',
                descripcion: p.descripcion || '',
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
