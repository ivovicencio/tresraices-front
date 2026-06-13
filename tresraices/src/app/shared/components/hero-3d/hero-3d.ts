import { Component, AfterViewInit, OnDestroy } from '@angular/core';
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
export class Hero3d implements AfterViewInit, OnDestroy {
  whatsapp = environment.whatsappNumber;

  services: ServiceLink[] = [
    { id: 'loteos', label: 'Loteos', message: 'Hola! Quiero información sobre los lotes disponibles.' },
    { id: 'construccion', label: 'Construcción', message: 'Hola! Quiero información sobre servicios de construcción.' },
    { id: 'instalaciones', label: 'Instalaciones', message: 'Hola! Quiero información sobre instalaciones.' },
    { id: 'remodelaciones', label: 'Remodelaciones', message: 'Hola! Quiero información sobre remodelaciones.' },
  ];

  private rafId = 0;
  private particles: { el: HTMLElement; x: number; y: number; vx: number; vy: number }[] = [];

  ngAfterViewInit(): void {
    this.animateEntrance();
    this.animateSvgDraw();
    this.animateMotionPath();
    this.initParticles();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
  }

  private animateEntrance(): void {
    const tl = createTimeline({});
    tl.add('.hero-badge', { translateY: [20, 0], opacity: [0, 1], ease: 'outCubic' }, 0)
      .add('.hero-title-line', { translateY: [40, 0], opacity: [0, 1], ease: 'outCubic', duration: 1000 }, 200)
      .add('.service-strip', { opacity: [0, 1], translateY: [10, 0], ease: 'outCubic' }, 600)
      .add('.hero-actions', { translateY: [15, 0], opacity: [0, 1], ease: 'outCubic' }, 750)
      .add('.hero-scroll', { opacity: [0, 1], translateY: [10, 0], ease: 'outCubic' }, 900);
  }

  private animateMotionPath(): void {
    const delay = 1400;
    animate('.motion-dot', {
      ease: 'linear',
      duration: 5000,
      loop: true,
      delay,
      opacity: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
      ...svg.createMotionPath('.motion-path'),
    });

    animate(svg.createDrawable('.motion-path'), {
      draw: '0 1',
      ease: 'linear',
      duration: 5000,
      loop: true,
      delay,
    });
  }

  private animateSvgDraw(): void {
    setTimeout(() => {
      animate(svg.createDrawable('.line'), {
        draw: ['0 0', '0 1', '1 1'],
        ease: 'inOutQuad',
        duration: 2000,
        delay: stagger(100),
        loop: true
      });
    }, 1200);
  }

  private initParticles(): void {
    const container = document.querySelector('.hero-particles');
    if (!container) return;

    for (let i = 0; i < 15; i++) {
      const el = document.createElement('span');
      const size = 2 + Math.random() * 3;
      el.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        border-radius:50%;
        background:rgba(201,162,65,${0.15 + Math.random() * 0.25});
        pointer-events:none;
      `;
      container.appendChild(el);
      this.particles.push({
        el,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.02 - Math.random() * 0.04,
      });
    }

    this.animateParticles();
  }

  private animateParticles(): void {
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -5) { p.y = 105; p.x = Math.random() * 100; }
      if (p.x < -5 || p.x > 105) p.vx *= -1;
      p.el.style.transform = `translate(${p.x}vw, ${p.y}vh)`;
    });
    this.rafId = requestAnimationFrame(() => this.animateParticles());
  }

  encodeURIComponent(v: string): string {
    return encodeURIComponent(v);
  }
}
