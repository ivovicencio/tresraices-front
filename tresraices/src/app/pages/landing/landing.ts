import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero3d } from '../../shared/components/hero-3d/hero-3d';
import { MapaInteractivo } from '../mapa-interactivo/mapa-interactivo';
import { environment } from '../../../environments/environment';
import { animate, createTimeline, createTimer, onScroll, splitText, svg, stagger } from 'animejs';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, Hero3d, MapaInteractivo],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing implements AfterViewInit {
  @ViewChild('loteoVideo') loteoVideo!: ElementRef<HTMLVideoElement>;
  whatsapp = environment.whatsappNumber;
  videoPlayed = false;

  ngAfterViewInit() {
    this.animateScrollReveals();
    this.animateWhatsapp();
  }

  toggleVideo() {
    const video = this.loteoVideo?.nativeElement;
    if (!video) return;
    if (this.videoPlayed) {
      video.pause();
      this.videoPlayed = false;
    } else {
      video.muted = false;
      video.play();
      this.videoPlayed = true;
    }
  }

  onVideoEnded() {
    this.videoPlayed = false;
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
          { sel: '.section-label', delay: 150 },
          { sel: '.section-title', delay: 250 },
          { sel: '.about-mission', delay: 350 },
          { sel: '.about-stats .stat-item', delay: 500, staggerDelay: 100 },
          { sel: '.work-figure', delay: 150, staggerDelay: 100 },
        ],
      },
      {
        dataSection: 'proceso',
        items: [
          { sel: '.section-label', delay: 0 },
          { sel: '.section-title', delay: 100 },
          { sel: '.section-subtitle', delay: 200 },
          { sel: '.proceso-step', delay: 350, staggerDelay: 150 },
        ],
        threshold: 0.15,
      },
      {
        dataSection: 'cerros',
        items: [
          { sel: '.loteo-badge', delay: 0 },
          { sel: '.loteo-title', delay: 100 },
          { sel: '.loteo-location', delay: 200 },
          { sel: '.loteo-desc', delay: 300 },
          { sel: '.loteo-feature', delay: 400, staggerDelay: 80 },
          { sel: '.loteo-video-wrapper', delay: 0 },
          { sel: '.btn-gold', delay: 500 },
          { sel: '.btn-outline-gold', delay: 550 },
        ],
      },
      {
        dataSection: 'lotes',
        items: [
          { sel: '.section-label', delay: 0 },
          { sel: '.section-title', delay: 100 },
          { sel: '.section-subtitle', delay: 200 },
        ],
      },
      {
        dataSection: 'equipo',
        items: [
          { sel: '.section-label', delay: 0 },
          { sel: '.section-title', delay: 100 },
          { sel: '.section-subtitle', delay: 200 },
          { sel: '.equipo-figure', delay: 350, staggerDelay: 120 },
        ],
      },
      {
        dataSection: 'contacto',
        items: [
          { sel: '.cta-image-wrapper', delay: 0 },
          { sel: '.section-label', delay: 150 },
          { sel: '.section-title', delay: 250 },
          { sel: '.section-subtitle', delay: 350 },
          { sel: '.btn-gold', delay: 500 },
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
              if (dataSection === 'about') {
                this.revealAbout(section);
              } else {
                this.revealSection(section, items);
              }
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
          if (dataSection === 'about') {
            this.revealAbout(section);
          } else {
            this.revealSection(section, items);
          }
        }
      });
    }, 100);
  }

  private revealAbout(section: HTMLElement) {
    const img = section.querySelectorAll('.about-image-wrapper');
    const label = section.querySelectorAll('.section-label');
    const title = section.querySelectorAll('.section-title');
    const mission = section.querySelectorAll('.about-mission');
    const stats = section.querySelectorAll('.about-stats .stat-item');
    const figures = section.querySelectorAll('.work-figure');

    animate(img, { translateY: [40, 0], opacity: [0, 1], duration: 800, ease: 'outCubic' });
    animate(label, { translateY: [40, 0], opacity: [0, 1], duration: 800, ease: 'outCubic', delay: 150 });
    animate(title, { translateY: [40, 0], opacity: [0, 1], duration: 800, ease: 'outCubic', delay: 250 });

    const aboutLines = section.querySelectorAll('.section-line-path');
    if (aboutLines.length) {
      animate(svg.createDrawable(aboutLines), { draw: ['0 0', '0 1'], ease: 'outQuad', duration: 400, delay: 150 });
    }

    const missionSplit = splitText(mission, { words: true });
    createTimeline({ delay: 350 })
      .add(mission, { opacity: [0, 1], duration: 1 }, 0)
      .add(missionSplit.words, {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 400,
        ease: 'outQuad',
        delay: stagger(20),
      })
      .add(stats, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        ease: 'outCubic',
        delay: stagger(100),
      }, 0);

    this.animateCounters(section);

    animate(figures, {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 700,
      ease: 'outCubic',
      delay: stagger(100),
    });
  }

  private animateCounters(section: HTMLElement) {
    const counters = section.querySelectorAll('.stat-number');
    counters.forEach(($el) => {
      const hasPercent = $el.textContent?.includes('%') ?? false;
      const target = parseInt($el.textContent?.replace(/[^0-9]/g, '') || '0', 10);
      createTimer({
        duration: 1200,
        onUpdate: (self) => {
          const val = Math.round(self.progress * target);
          $el.textContent = val + (hasPercent ? '%' : '');
        },
      });
    });
  }

  private revealSection(section: HTMLElement, items: { sel: string; delay: number; staggerDelay?: number }[]) {
    const secLines = section.querySelectorAll('.section-line-path');
    if (secLines.length) {
      animate(svg.createDrawable(secLines), { draw: ['0 0', '0 1'], ease: 'outQuad', duration: 400, delay: 150 });
    }

    items.forEach(({ sel, delay, staggerDelay }) => {
      const targets = section.querySelectorAll(sel);
      if (!targets.length) return;

      if (sel === '.section-subtitle') {
        const textSplit = splitText(targets, { words: true });
        createTimeline({ delay })
          .add(targets, { opacity: [0, 1], duration: 1 }, 0)
          .add(textSplit.words, {
            translateY: [20, 0],
            opacity: [0, 1],
            rotateX: [-10, 0],
            duration: 500,
            ease: 'outQuad',
            delay: stagger(25),
          });
        return;
      }

      if (sel === '.proceso-step' && staggerDelay) {
        const tl = createTimeline({ delay });
        targets.forEach((t) => {
          tl.add(t, {
            translateY: [40, 0],
            opacity: [0, 1],
            duration: 700,
            ease: 'outCubic',
          }, `-=${0}`);
        });
        return;
      }

      if (staggerDelay) {
        animate(targets, {
          translateY: [40, 0],
          opacity: [0, 1],
          duration: 800,
          ease: 'outCubic',
          delay: (_: any, i: number) => delay + i * staggerDelay,
        });
      } else {
        animate(targets, {
          translateY: [40, 0],
          opacity: [0, 1],
          duration: 800,
          ease: 'outCubic',
          delay,
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
      scale: [1, 1.06, 1],
      duration: 2000,
      loop: true,
      ease: 'inOutSine',
    });
  }
}
