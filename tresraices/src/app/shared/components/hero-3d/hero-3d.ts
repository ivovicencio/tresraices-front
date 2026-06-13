import {
  Component,
  AfterViewInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createTimeline } from 'animejs';
import { environment } from '../../../../environments/environment';

gsap.registerPlugin(ScrollTrigger);

interface Point {
  id: string;
  title: string;
  desc: string;
  x: number;
  y: number;
  color: string;
}

@Component({
  selector: 'app-hero-3d',
  imports: [RouterLink],
  templateUrl: './hero-3d.html',
  styleUrl: './hero-3d.css',
  standalone: true,
})
export class Hero3d implements AfterViewInit, OnDestroy {
  whatsapp = environment.whatsappNumber;

  hoveredPoint: string | null = null;

  activePoint: string | null = null;

  center = { x: 50, y: 42 };

  points: Point[] = [
    {
      id: 'lotes',
      title: 'Lotes Disponibles',
      desc: 'Terrenos planificados con todos los servicios en un entorno natural privilegiado.',
      x: 22,
      y: 28,
      color: '#c9a241',
    },
    {
      id: 'infraestructura',
      title: 'Infraestructura',
      desc: 'Redes eléctricas, sanitarias, gas y acceso directo desde la ruta provincial.',
      x: 74,
      y: 24,
      color: '#6ba4d9',
    },
    {
      id: 'comunidad',
      title: 'Comunidad',
      desc: 'Un barrio planificado pensado para la convivencia y el bienestar de tu familia.',
      x: 80,
      y: 60,
      color: '#e8a87c',
    },
    {
      id: 'servicios',
      title: 'Servicios',
      desc: 'Cercanía a escuelas, centros de salud, comercios y transporte público.',
      x: 44,
      y: 74,
      color: '#7ec8a0',
    },
    {
      id: 'espacios-verdes',
      title: 'Espacios Verdes',
      desc: 'Áreas recreativas y pulmones verdes integrados al desarrollo.',
      x: 14,
      y: 60,
      color: '#8fbc8f',
    },
  ];

  private mouseX = 0;
  private mouseY = 0;
  private targetParallax = { x: 0, y: 0 };
  private currentParallax = { x: 0, y: 0 };
  private rafId = 0;

  get activePointData(): Point | null {
    return this.points.find((p) => p.id === this.activePoint) ?? null;
  }

  svgPaths: { d: string; color: string; id: string }[] = [];

  ngAfterViewInit(): void {
    this.computePaths();
    this.animateEntrance();
    this.setupScrollAnimation();
    this.parallaxLoop();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }

  private computePaths(): void {
    this.svgPaths = this.points.map((p) => {
      const cx = this.center.x;
      const cy = this.center.y;
      const cpx1 = cx + (p.x - cx) * 0.4;
      const cpy1 = cy + (p.y - cy) * 0.3 - 4;
      const cpx2 = cx + (p.x - cx) * 0.6;
      const cpy2 = cy + (p.y - cy) * 0.7 + 2;
      return {
        id: p.id,
        color: p.color,
        d: `M${cx},${cy}C${cpx1},${cpy1} ${cpx2},${cpy2} ${p.x},${p.y}`,
      };
    });
  }

  private animateEntrance(): void {
    const tl = createTimeline({});

    tl.add('.hero-bg-terrain', { opacity: [0, 1], duration: 1500, ease: 'outCubic' }, 0)
      .add('.hero-overlay-dark', { opacity: [0, 1], duration: 1200, ease: 'outCubic' }, 100)
      .add('.hero-title-line', { translateY: [50, 0], opacity: [0, 1], duration: 1200, ease: 'outCubic' }, 400)
      .add('.hero-tagline', { translateY: [30, 0], opacity: [0, 1], duration: 1000, ease: 'outCubic' }, 700)
      .add('.hero-cta', { translateY: [20, 0], opacity: [0, 1], duration: 800, ease: 'outCubic' }, 900)
      .add('.hero-scroll', { opacity: [0, 1], translateY: [15, 0], ease: 'outCubic' }, 1100);

    gsap.fromTo(
      '.connection-path',
      { strokeDashoffset: 300 },
      {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: 'power3.out',
        delay: 0.6,
        stagger: 0.15,
      },
    );

    gsap.fromTo(
      '.poi-marker',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'back.out(2)',
        delay: 1.2,
        stagger: 0.12,
      },
    );
  }

  private setupScrollAnimation(): void {
    gsap.to('.hero-cinematic', {
      opacity: 0.3,
      scrollTrigger: {
        trigger: '.hero-cinematic',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    this.mouseX = (e.clientX - rect.left) / rect.width;
    this.mouseY = (e.clientY - rect.top) / rect.height;
  }

  private parallaxLoop(): void {
    this.targetParallax.x = (this.mouseX - 0.5) * 20;
    this.targetParallax.y = (this.mouseY - 0.5) * 20;

    this.currentParallax.x += (this.targetParallax.x - this.currentParallax.x) * 0.06;
    this.currentParallax.y += (this.targetParallax.y - this.currentParallax.y) * 0.06;

    const px = this.currentParallax.x;
    const py = this.currentParallax.y;

    const bg = document.querySelector('.hero-bg-terrain') as HTMLElement;
    const overlay = document.querySelector('.hero-overlay-dark') as HTMLElement;
    const poiContainer = document.querySelector('.poi-container') as HTMLElement;

    if (bg) bg.style.transform = `translate(${px * 0.08}px, ${py * 0.08}px)`;
    if (overlay) overlay.style.transform = `translate(${px * 0.04}px, ${py * 0.04}px)`;
    if (poiContainer) poiContainer.style.transform = `translate(${px * 0.02}px, ${py * 0.02}px)`;

    this.rafId = requestAnimationFrame(() => this.parallaxLoop());
  }

  onPointEnter(id: string): void {
    this.hoveredPoint = id;
  }

  onPointLeave(): void {
    this.hoveredPoint = null;
  }

  togglePoint(id: string): void {
    this.activePoint = this.activePoint === id ? null : id;
  }

  closeTooltip(): void {
    this.activePoint = null;
  }

  encodeURIComponent(v: string): string {
    return encodeURIComponent(v);
  }
}
