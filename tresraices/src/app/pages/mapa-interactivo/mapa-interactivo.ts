import { Component, Input, OnInit, signal, computed, AfterViewInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
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
  imports: [DecimalPipe],
  templateUrl: './mapa-interactivo.html',
  styleUrl: './mapa-interactivo.css',
})
export class MapaInteractivo implements OnInit, AfterViewInit {
  @Input() hideHeader = false;
  zoomAbierto = signal(false);
  zoomNivel = signal(1);
  panX = signal(0);
  panY = signal(0);
  zoomTransform = computed(() => `translate(${this.panX()}px, ${this.panY()}px) scale(${this.zoomNivel()})`);
  private panning = false;
  private panStartX = 0;
  private panStartY = 0;
  private panOrigX = 0;
  private panOrigY = 0;

  abrirZoom(e: Event) {
    e.stopPropagation();
    this.zoomAbierto.set(true);
    this.resetZoom();
    document.body.style.overflow = 'hidden';
  }

  cerrarZoom(e: Event) {
    const target = e.target as HTMLElement;
    if (target.closest('.zoom-container') || target.closest('.zoom-ctrl-btn') || target.closest('.zoom-level')) return;
    this.zoomAbierto.set(false);
    document.body.style.overflow = '';
  }

  zoomIn() {
    this.zoomNivel.update(v => Math.min(v * 1.4, 5));
  }

  zoomOut() {
    this.zoomNivel.update(v => Math.max(v / 1.4, 0.5));
  }

  resetZoom() {
    this.zoomNivel.set(1);
    this.panX.set(0);
    this.panY.set(0);
  }

  zoomRueda(e: WheelEvent) {
    e.preventDefault();
    const dir = e.deltaY > 0 ? 1.4 : 1 / 1.4;
    this.zoomNivel.update(v => Math.max(0.5, Math.min(v * dir, 5)));
  }

  iniciarPan(e: MouseEvent) {
    if (e.button !== 0) return;
    this.panning = true;
    this.panStartX = e.clientX;
    this.panStartY = e.clientY;
    this.panOrigX = this.panX();
    this.panOrigY = this.panY();
  }

  moverPan(e: MouseEvent) {
    if (!this.panning) return;
    this.panX.set(this.panOrigX + (e.clientX - this.panStartX));
    this.panY.set(this.panOrigY + (e.clientY - this.panStartY));
  }

  detenerPan() {
    this.panning = false;
  }

  iniciarPanTouch(e: TouchEvent) {
    if (e.touches.length !== 1) return;
    this.panning = true;
    this.panStartX = e.touches[0].clientX;
    this.panStartY = e.touches[0].clientY;
    this.panOrigX = this.panX();
    this.panOrigY = this.panY();
  }

  moverPanTouch(e: TouchEvent) {
    if (!this.panning || e.touches.length !== 1) return;
    e.preventDefault();
    this.panX.set(this.panOrigX + (e.touches[0].clientX - this.panStartX));
    this.panY.set(this.panOrigY + (e.touches[0].clientY - this.panStartY));
  }

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
