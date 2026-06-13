import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Application } from '@splinetool/runtime';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { environment } from '../../../../environments/environment';

gsap.registerPlugin(ScrollTrigger);

interface ServiceNode {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

@Component({
  selector: 'app-hero-3d',
  imports: [NgFor, RouterLink],
  templateUrl: './hero-3d.html',
  styleUrl: './hero-3d.css',
  standalone: true,
})
export class Hero3d implements AfterViewInit, OnDestroy {
  @ViewChild('splineCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  whatsapp = environment.whatsappNumber;
  activeService: string | null = null;
  hoveredService: string | null = null;
  loaded = false;

  services: ServiceNode[] = [
    {
      id: 'loteos',
      title: 'Loteos',
      desc: 'Terrenos planificados con todos los servicios, listos para construir tu hogar.',
      icon: 'bi bi-geo-alt',
    },
    {
      id: 'construccion',
      title: 'Construcción',
      desc: 'Proyectos residenciales con calidad certificada, desde los cimientos hasta los detalles finales.',
      icon: 'bi bi-building',
    },
    {
      id: 'instalaciones',
      title: 'Instalaciones',
      desc: 'Redes eléctricas, sanitarias, gas y climatización con materiales certificados y personal matriculado.',
      icon: 'bi bi-gear',
    },
    {
      id: 'remodelaciones',
      title: 'Remodelaciones',
      desc: 'Transformamos espacios existentes: ampliaciones, reformas integrales y puesta en valor.',
      icon: 'bi bi-arrow-repeat',
    },
  ];

  private spline!: Application;
  // ⚠️ REEMPLAZÁ ESTA URL por la de tu escena publicada en Spline
  private sceneUrl =
    'https://prod.spline.design/YOUR-SCENE-ID-HERE';

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.initSpline();
    this.setupScrollAnimation();
  }

  ngOnDestroy(): void {
    this.spline?.dispose();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }

  private async initSpline(): Promise<void> {
    try {
      this.spline = new Application(this.canvasRef.nativeElement);

      this.spline.addEventListener('mouseDown', (e: any) => {
        const name: string | undefined = e.target?.name;
        if (!name) return;
        const match = this.services.find((s) => name.includes(s.id));
        if (match) {
          this.ngZone.run(() => this.toggleService(match.id));
        }
      });

      // Spline objects named "hotspot-loteos", "hotspot-construccion", etc.
      // must exist in the Spline scene and have an Event → "Mouse Down"

      await this.spline.load(this.sceneUrl);
      this.ngZone.run(() => (this.loaded = true));

      this.setupSplineEvents();
    } catch (err) {
      console.error('Spline scene failed to load:', err);
      // fallback: scene still works without 3D
      this.ngZone.run(() => (this.loaded = true));
    }
  }

  private setupSplineEvents(): void {
    // Hover highlight on hotspot objects
    this.canvasRef.nativeElement.addEventListener('mousemove', (e) => {
      // Spline doesn't expose hover on objects directly via runtime
      // but we handle hover via HTML labels + canvas cursor
    });

    this.canvasRef.nativeElement.addEventListener('mouseenter', () => {
      this.canvasRef.nativeElement.style.cursor = 'default';
    });
  }

  private setupScrollAnimation(): void {
    const canvas = this.canvasRef.nativeElement;

    gsap.to(canvas, {
      opacity: 0.3,
      scale: 0.95,
      scrollTrigger: {
        trigger: canvas,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    gsap.to(canvas, {
      y: -80,
      scrollTrigger: {
        trigger: canvas,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  toggleService(id: string): void {
    this.activeService = this.activeService === id ? null : id;
  }

  closePanel(): void {
    this.activeService = null;
  }

  encodeURIComponent(v: string): string {
    return encodeURIComponent(v);
  }
}
