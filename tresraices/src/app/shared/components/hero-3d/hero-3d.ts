import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { animate, createTimeline, svg, stagger } from 'animejs';
import { environment } from '../../../../environments/environment';

interface ServiceLink {
  id: string;
  label: string;
  message: string;
}

@Component({
  selector: 'app-hero-3d',
  imports: [RouterLink],
  templateUrl: './hero-3d.html',
  styleUrl: './hero-3d.css',
  standalone: true,
})
export class Hero3d implements AfterViewInit {
  whatsapp = environment.whatsappNumber;

  services: ServiceLink[] = [
    { id: 'loteos', label: 'Loteos', message: 'Hola! Quiero información sobre los lotes disponibles.' },
    { id: 'construccion', label: 'Construcción', message: 'Hola! Quiero información sobre servicios de construcción.' },
    { id: 'instalaciones', label: 'Instalaciones', message: 'Hola! Quiero información sobre instalaciones.' },
    { id: 'remodelaciones', label: 'Remodelaciones', message: 'Hola! Quiero información sobre remodelaciones.' },
  ];

  ngAfterViewInit(): void {
    this.animateEntrance();
  }

  private animateEntrance(): void {
    const tl = createTimeline({});
    tl.add('.hero-badge', { translateY: [20, 0], opacity: [0, 1], ease: 'outCubic' }, 0)
      .add('.hero-title-line', { translateY: [40, 0], opacity: [0, 1], ease: 'outCubic', duration: 800 }, 150)
      .add('.service-strip', { opacity: [0, 1], translateY: [10, 0], ease: 'outCubic' }, 500)
      .add('.hero-actions', { translateY: [15, 0], opacity: [0, 1], ease: 'outCubic' }, 650)
      .add('.hero-scroll', { opacity: [0, 1], translateY: [10, 0], ease: 'outCubic' }, 800);
  }

  encodeURIComponent(v: string): string {
    return encodeURIComponent(v);
  }
}
