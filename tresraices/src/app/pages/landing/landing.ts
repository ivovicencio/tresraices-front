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
    this.setupParallax();
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
          { sel: '.loteo-video-wrapper', delay: 0 },
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

    animate(img, { translateY: [55, 0], opacity: [0, 1], duration: 1200, ease: 'outCubic' });
    animate(label, { translateY: [55, 0], opacity: [0, 1], duration: 1200, ease: 'outCubic', delay: 200 });
    animate(title, { translateY: [55, 0], opacity: [0, 1], duration: 1200, ease: 'outCubic', delay: 350 });

    const aboutLines = section.querySelectorAll('.section-line-path');
    if (aboutLines.length) {
      animate(svg.createDrawable(aboutLines), { draw: ['0 0', '0 1'], ease: 'outQuad', duration: 500, delay: 200 });
    }

    const aboutDot = section.querySelectorAll('.about-motion-dot');
    const aboutPath = section.querySelectorAll('.about-motion-path');
    if (aboutDot.length && aboutPath.length) {
      animate(aboutDot, {
        ease: 'linear', duration: 6000, loop: true, delay: 900,
        opacity: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        ...svg.createMotionPath(aboutPath),
      });
      animate(svg.createDrawable(aboutPath), {
        draw: '0 1', ease: 'linear', duration: 6000, loop: true, delay: 900,
      });
    }

    const missionSplit = splitText(mission, { words: true });
    createTimeline({ delay: 500 })
      .add(mission, { opacity: [0, 1], duration: 1 }, 0)
      .add(missionSplit.words, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        ease: 'outQuad',
        delay: stagger(30),
      })
      .add(stats, {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 800,
        ease: 'outCubic',
        delay: stagger(120),
      }, 0);

    this.animateCounters(section);

    animate(figures, {
      translateY: [60, 0],
      opacity: [0, 1],
      duration: 1000,
      ease: 'outCubic',
      delay: stagger(150),
    });
  }

  private animateCounters(section: HTMLElement) {
    const counters = section.querySelectorAll('.stat-number');
    counters.forEach(($el) => {
      const hasPercent = $el.textContent?.includes('%') ?? false;
      const target = parseInt($el.textContent?.replace(/[^0-9]/g, '') || '0', 10);
      createTimer({
        duration: 1800,
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
      animate(svg.createDrawable(secLines), { draw: ['0 0', '0 1'], ease: 'outQuad', duration: 500, delay: 200 });
    }

    items.forEach(({ sel, delay, staggerDelay }) => {
      const targets = section.querySelectorAll(sel);
      if (!targets.length) return;

      if (sel === '.section-subtitle') {
        const textSplit = splitText(targets, { words: true });
        createTimeline({ delay })
          .add(targets, { opacity: [0, 1], duration: 1 }, 0)
          .add(textSplit.words, {
            translateY: [30, 0],
            opacity: [0, 1],
            rotateX: [-15, 0],
            duration: 700,
            ease: 'outQuad',
            delay: stagger(35),
          });
        return;
      }

      if (sel === '.proceso-step' && staggerDelay) {
        const tl = createTimeline({ delay });
        targets.forEach((t) => {
          tl.add(t, {
            translateY: [55, 0],
            opacity: [0, 1],
            duration: 1000,
            ease: 'outCubic',
          }, `-=${0}`);
        });
        return;
      }

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
          delay,
        });
      }
    });
  }

  private setupParallax() {
    const bg = document.querySelectorAll('.loteo-bg');
    if (!bg.length) return;

    animate(bg, {
      translateY: ['0rem', '3rem'],
      duration: 6000,
      ease: 'linear',
      autoplay: onScroll({
        target: document.querySelector('.loteo-hero')!,
        container: window as any,
      }),
    });

    const badges = document.querySelectorAll('.loteo-image-badge, .about-image-border');
    animate(badges, {
      scale: [1, 1.02, 1],
      duration: 4000,
      loop: true,
      ease: 'inOutSine',
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
}
