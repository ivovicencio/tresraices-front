import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MapaInteractivo } from '../mapa-interactivo/mapa-interactivo';
import { environment } from '../../../environments/environment';
import { animate, createTimeline } from 'animejs';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, MapaInteractivo],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing implements AfterViewInit {
  whatsapp = environment.whatsappNumber;

  ngAfterViewInit() {
    this.animateHero();
    this.animateScrollReveals();
    this.animateWhatsapp();
  }

  private animateHero() {
    const tl = createTimeline({});
    tl.add('.hero-badge', { translateY: [30, 0], opacity: [0, 1], ease: 'outCubic' }, 0)
      .add('.hero-title-line', { translateY: [60, 0], opacity: [0, 1], ease: 'outCubic' }, 200)
      .add('.hero-divider', { opacity: [0, 1], translateY: [15, 0], ease: 'outCubic' }, 400)
      .add('.hero-subtitle', { translateY: [25, 0], opacity: [0, 1], ease: 'outCubic' }, 600)
      .add('.hero-scroll', { opacity: [0, 1], translateY: [15, 0], ease: 'outCubic' }, 800);
  }

  private animateScrollReveals() {
    const configs: {
      dataSection: string;
      items: { sel: string; delay: number; staggerDelay?: number }[];
      threshold?: number;
    }[] = [
      {
        dataSection: 'about',
        items: [
          { sel: '.about-image-wrapper', delay: 0 },
          { sel: '.section-label', delay: 200 },
          { sel: '.section-title', delay: 350 },
          { sel: '.about-mission', delay: 500 },
        ],
      },
      {
        dataSection: 'servicios',
        items: [
          { sel: '.section-label', delay: 0 },
          { sel: '.section-title', delay: 150 },
          { sel: '.section-subtitle', delay: 300 },
          { sel: '.servicio-card', delay: 500, staggerDelay: 150 },
        ],
        threshold: 0.15,
      },
      {
        dataSection: 'proceso',
        items: [
          { sel: '.section-label', delay: 0 },
          { sel: '.section-title', delay: 150 },
          { sel: '.section-subtitle', delay: 300 },
          { sel: '.proceso-banner', delay: 480 },
          { sel: '.proceso-step', delay: 700, staggerDelay: 200 },
        ],
        threshold: 0.15,
      },
      {
        dataSection: 'cerros',
        items: [
          { sel: '.loteo-badge', delay: 0 },
          { sel: '.loteo-title', delay: 150 },
          { sel: '.loteo-location', delay: 280 },
          { sel: '.loteo-desc', delay: 380 },
          { sel: '.loteo-feature', delay: 500, staggerDelay: 100 },
          { sel: '.loteo-image-wrapper', delay: 0 },
          { sel: '.btn-gold', delay: 650 },
          { sel: '.btn-outline-gold', delay: 700 },
        ],
      },
      {
        dataSection: 'lotes',
        items: [
          { sel: '.section-label', delay: 0 },
          { sel: '.section-title', delay: 120 },
          { sel: '.section-subtitle', delay: 240 },
        ],
      },
      {
        dataSection: 'equipo',
        items: [
          { sel: '.team-image-wrapper', delay: 0 },
          { sel: '.section-label', delay: 200 },
          { sel: '.section-title', delay: 350 },
          { sel: '.section-subtitle', delay: 500 },
          { sel: '.team-feature-card', delay: 650, staggerDelay: 150 },
        ],
      },
      {
        dataSection: 'contacto',
        items: [
          { sel: '.cta-image-wrapper', delay: 0 },
          { sel: '.section-label', delay: 200 },
          { sel: '.section-title', delay: 350 },
          { sel: '.section-subtitle', delay: 500 },
          { sel: '.btn-gold', delay: 650 },
        ],
      },
    ];

    configs.forEach(({ dataSection, items, threshold }) => {
      const section = document.querySelector<HTMLElement>(`[data-section="${dataSection}"]`);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.revealSection(section, items);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: threshold ?? 0.15 }
      );

      observer.observe(section);
    });

    setTimeout(() => {
      configs.forEach(({ dataSection, items }) => {
        const section = document.querySelector<HTMLElement>(`[data-section="${dataSection}"]`);
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          this.revealSection(section, items);
        }
      });
    }, 100);
  }

  private revealSection(section: HTMLElement, items: { sel: string; delay: number; staggerDelay?: number }[]) {
    items.forEach(({ sel, delay, staggerDelay }) => {
      const targets = section.querySelectorAll(sel);
      if (!targets.length) return;
      if (staggerDelay) {
        animate(targets, {
          translateY: [55, 0],
          opacity: [0, 1],
          duration: 1200,
          ease: 'outCubic',
          delay: (_: any, i: number) => delay + i * staggerDelay,
        });
      } else {
        animate(targets, {
          translateY: [55, 0],
          opacity: [0, 1],
          duration: 1200,
          ease: 'outCubic',
          delay: delay,
        });
      }
    });
  }

  private animateWhatsapp() {
    animate('.whatsapp-float', {
      scale: [1, 1.08, 1],
      duration: 2000,
      loop: true,
      ease: 'inOutSine',
    });
  }
}
