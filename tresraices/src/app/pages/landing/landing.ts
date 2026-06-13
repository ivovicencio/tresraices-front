import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero3d } from '../../shared/components/hero-3d/hero-3d';
import { MapaInteractivo } from '../mapa-interactivo/mapa-interactivo';
import { environment } from '../../../environments/environment';
import { animate } from 'animejs';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, Hero3d, MapaInteractivo],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing implements AfterViewInit {
  whatsapp = environment.whatsappNumber;

  ngAfterViewInit() {
    this.animateScrollReveals();
    this.animateWhatsapp();
    setTimeout(() => this.fallbackRevealAll(), 8000);
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
          { sel: '.about-stats .stat-item', delay: 650, staggerDelay: 120 },
          { sel: '.work-figure', delay: 200, staggerDelay: 150 },
        ],
      },
      {
        dataSection: 'proceso',
        items: [
          { sel: '.section-label', delay: 0 },
          { sel: '.section-title', delay: 150 },
          { sel: '.section-subtitle', delay: 300 },
          { sel: '.proceso-step', delay: 480, staggerDelay: 200 },
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
          { sel: '.section-label', delay: 0 },
          { sel: '.section-title', delay: 150 },
          { sel: '.section-subtitle', delay: 300 },
          { sel: '.equipo-figure', delay: 480, staggerDelay: 180 },
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

  scrollToMapa(event: Event) {
    event.preventDefault();
    const el = document.querySelector('#lotes-mapa');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private animateWhatsapp() {
    animate('.whatsapp-float', {
      scale: [1, 1.08, 1],
      duration: 2000,
      loop: true,
      ease: 'inOutSine',
    });
  }

  /* Ultimate safety net: if all JS animation fails, show everything after 8s */
  private fallbackRevealAll() {
    const allAffected = document.querySelectorAll(
      '[data-section] .section-label, [data-section] .section-title, [data-section] .section-subtitle, ' +
      '[data-section] .about-image-wrapper, [data-section] .about-mission, ' +
      '[data-section] .about-stats .stat-item, [data-section] .work-figure, ' +
      '[data-section] .proceso-step, [data-section] .loteo-badge, [data-section] .loteo-title, ' +
      '[data-section] .loteo-location, [data-section] .loteo-desc, [data-section] .loteo-feature, ' +
      '[data-section] .loteo-image-wrapper, [data-section] .equipo-figure, ' +
      '[data-section] .cta-image-wrapper, [data-section] .btn-gold, [data-section] .btn-outline-gold, ' +
      '.whatsapp-float'
    );
    allAffected.forEach((el) => {
      if (el instanceof HTMLElement && el.style.opacity !== '1') {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }
}
