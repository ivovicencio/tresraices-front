import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { environment } from '../../../../environments/environment';

gsap.registerPlugin(ScrollTrigger);

interface ServiceNode {
  id: string;
  title: string;
  desc: string;
  icon: string;
  position: THREE.Vector3;
  mesh?: THREE.Mesh;
  ring?: THREE.Mesh;
  beam?: THREE.Line;
}

@Component({
  selector: 'app-hero-3d',
  imports: [NgFor, RouterLink],
  templateUrl: './hero-3d.html',
  styleUrl: './hero-3d.css',
  standalone: true,
})
export class Hero3d implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer') container!: ElementRef<HTMLElement>;

  whatsapp = environment.whatsappNumber;
  activeService: string | null = null;
  hoveredService: string | null = null;
  sceneReady = false;

  services: ServiceNode[] = [
    {
      id: 'loteos',
      title: 'Loteos',
      desc: 'Terrenos planificados con todos los servicios, listos para construir tu hogar.',
      icon: 'bi bi-geo-alt',
      position: new THREE.Vector3(-4.5, 1.4, -2),
    },
    {
      id: 'construccion',
      title: 'Construcción',
      desc: 'Proyectos residenciales con calidad certificada, desde los cimientos hasta los detalles finales.',
      icon: 'bi bi-building',
      position: new THREE.Vector3(4, 1.7, -2.5),
    },
    {
      id: 'instalaciones',
      title: 'Instalaciones',
      desc: 'Redes eléctricas, sanitarias, gas y climatización con materiales certificados y personal matriculado.',
      icon: 'bi bi-gear',
      position: new THREE.Vector3(-3.5, 1.1, 3.5),
    },
    {
      id: 'remodelaciones',
      title: 'Remodelaciones',
      desc: 'Transformamos espacios existentes: ampliaciones, reformas integrales y puesta en valor.',
      icon: 'bi bi-arrow-repeat',
      position: new THREE.Vector3(4.5, 1.5, 2.5),
    },
  ];

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private clock = new THREE.Clock();
  private animationId = 0;
  private mouse = { x: 0, y: 0 };
  private currentRot = { x: 0, y: 0 };
  private targetRot = { x: 0, y: 0 };
  private hotspotMeshes: THREE.Mesh[] = [];
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private terrainGroup = new THREE.Group();
  private particles!: THREE.Points;

  private get el() {
    return this.container.nativeElement;
  }

  ngAfterViewInit(): void {
    this.initScene();
    this.createTerrain();
    this.createHotspots();
    this.createLighting();
    this.createParticles();
    this.setupScrollAnimations();
    this.animate();
    this.sceneReady = true;
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.renderer?.dispose();
    this.scene?.traverse((o: THREE.Object3D) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        if (Array.isArray(o.material)) o.material.forEach((m: THREE.Material) => m.dispose());
        else o.material.dispose();
      }
    });
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x080c0a, 0.018);

    const aspect = this.el.clientWidth / this.el.clientHeight;
    this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 50);
    this.camera.position.set(0, 5, 13);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(this.el.clientWidth, this.el.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.5;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.inset = '0';
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.el.appendChild(this.renderer.domElement);
  }

  private createTerrain(): void {
    const size = 22;
    const seg = 90;
    const geo = new THREE.PlaneGeometry(size, size, seg, seg);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes['position'].array;
    for (let i = 0; i < pos.length; i += 3) {
      const x = pos[i];
      const z = pos[i + 2];
      const dist = Math.sqrt(x * x + z * z);
      const y =
        Math.sin(x * 0.35) * Math.cos(z * 0.25) * 0.7 +
        Math.sin(x * 0.7 + z * 0.5) * 0.35 +
        Math.cos(x * 0.15 + z * 0.6) * 0.25 +
        Math.exp(-dist * 0.12) * 0.6;
      pos[i + 1] = y;
    }
    geo.computeVertexNormals();

    const colors = new Float32Array(pos.length);
    for (let i = 0; i < pos.length; i += 3) {
      const y = pos[i + 1];
      const t = (y + 1) / 2.2;
      colors[i] = 0.04 + t * 0.12;
      colors[i + 1] = 0.1 + t * 0.28;
      colors[i + 2] = 0.05 + t * 0.07;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.7,
      metalness: 0.05,
      flatShading: false,
    });

    const terrain = new THREE.Mesh(geo, mat);
    terrain.receiveShadow = true;
    terrain.position.y = -1.2;
    this.terrainGroup.add(terrain);

    const wireMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xc9a241,
      transparent: true,
      opacity: 0.04,
    });
    const wireframe = new THREE.Mesh(geo.clone(), wireMat);
    wireframe.position.y = -1.2;
    this.terrainGroup.add(wireframe);

    this.scene.add(this.terrainGroup);
  }

  private createHotspots(): void {
    this.services.forEach((svc) => {
      const glowGeo = new THREE.SphereGeometry(0.28, 20, 20);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0xc9a241,
        transparent: true,
        opacity: 0.9,
      });
      const mesh = new THREE.Mesh(glowGeo, glowMat);
      mesh.position.copy(svc.position);
      mesh.userData['serviceId'] = svc.id;
      this.scene.add(mesh);
      this.hotspotMeshes.push(mesh);
      svc.mesh = mesh;

      const ringGeo = new THREE.RingGeometry(0.35, 0.52, 40);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xc9a241,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(svc.position);
      ring.position.y += 0.1;
      ring.lookAt(this.camera.position);
      this.scene.add(ring);
      svc.ring = ring;

      const beamPoints = [
        new THREE.Vector3(0, -0.35, 0),
        new THREE.Vector3(0, -1.8, 0),
      ];
      const beamGeo = new THREE.BufferGeometry().setFromPoints(beamPoints);
      const beamMat = new THREE.LineBasicMaterial({
        color: 0xc9a241,
        transparent: true,
        opacity: 0.12,
      });
      const beam = new THREE.Line(beamGeo, beamMat);
      beam.position.copy(svc.position);
      this.scene.add(beam);
      svc.beam = beam;

      const connectionPoints = [
        new THREE.Vector3(0, 0, 0),
        svc.position.clone().multiplyScalar(0.5).setY(svc.position.y * 0.3),
        svc.position.clone(),
      ];
      const curve = new THREE.CatmullRomCurve3(connectionPoints);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(
        curve.getPoints(20)
      );
      const curveMat = new THREE.LineBasicMaterial({
        color: 0xc9a241,
        transparent: true,
        opacity: 0.08,
      });
      const curveLine = new THREE.Line(curveGeo, curveMat);
      this.scene.add(curveLine);
    });
  }

  private createLighting(): void {
    const ambient = new THREE.AmbientLight(0x1a2e22, 0.4);
    this.scene.add(ambient);

    const key = new THREE.DirectionalLight(0xf5d590, 2);
    key.position.set(8, 14, 6);
    this.scene.add(key);

    const fill = new THREE.DirectionalLight(0x2a4a3a, 0.6);
    fill.position.set(-6, 8, -8);
    this.scene.add(fill);

    const rim = new THREE.DirectionalLight(0xc9a241, 0.4);
    rim.position.set(0, -3, 10);
    this.scene.add(rim);
  }

  private createParticles(): void {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 12;
      const height = (Math.random() - 0.5) * 7;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
      sizes[i] = Math.random() * 0.04 + 0.015;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      color: 0xc9a241,
      size: 0.035,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  private setupScrollAnimations(): void {
    gsap.to(this.camera.position, {
      y: 1.5,
      z: 9,
      scrollTrigger: {
        trigger: this.el,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    gsap.to(this.scene.fog, {
      density: 0.06,
      scrollTrigger: {
        trigger: this.el,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    gsap.to(this.terrainGroup.position, {
      y: -3,
      scrollTrigger: {
        trigger: this.el,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    gsap.to(this.particles.position, {
      y: -2,
      scrollTrigger: {
        trigger: this.el,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.renderer) return;
    const w = this.el.clientWidth;
    const h = this.el.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    const rect = this.el.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.targetRot.x = this.mouse.y * 0.04;
    this.targetRot.y = this.mouse.x * 0.06;

    this.pointer.x = this.mouse.x;
    this.pointer.y = this.mouse.y;

    this.checkHotspotHover();
  }

  @HostListener('click')
  onClickCanvas(): void {
    if (this.hoveredService) {
      this.activeService =
        this.activeService === this.hoveredService ? null : this.hoveredService;
    } else {
      this.activeService = null;
    }
  }

  private checkHotspotHover(): void {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.hotspotMeshes);

    if (intersects.length > 0) {
      const id = intersects[0].object.userData['serviceId'] as string;
      this.hoveredService = id;
    } else {
      this.hoveredService = null;
    }
  }

  closePanel(): void {
    this.activeService = null;
  }

  toggleService(id: string): void {
    this.activeService = this.activeService === id ? null : id;
  }

  encodeURIComponent(v: string): string {
    return encodeURIComponent(v);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    this.currentRot.x += (this.targetRot.x - this.currentRot.x) * 0.04;
    this.currentRot.y += (this.targetRot.y - this.currentRot.y) * 0.04;

    this.terrainGroup.rotation.x = this.currentRot.x;
    this.terrainGroup.rotation.y = this.currentRot.y;
    this.particles.rotation.y += 0.0003;

    const t = this.clock.elapsedTime;

    this.hotspotMeshes.forEach((mesh, i) => {
      const pulse = 1 + Math.sin(t * 2.5 + i * 1.7) * 0.15;
      mesh.scale.set(pulse, pulse, pulse);
      (mesh.material as THREE.MeshBasicMaterial).opacity =
        0.7 + Math.sin(t * 3 + i * 1.2) * 0.3;

      const svc = this.services[i];
      if (svc.ring) {
        svc.ring.lookAt(this.camera.position);
        svc.ring.scale.setScalar(1 + Math.sin(t * 1.5 + i) * 0.05);
      }
    });

    this.renderer.render(this.scene, this.camera);
  }
}
