import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoteService } from '../../core/services/lote';
import { LoteData } from '../../data/lotes.data';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule, RouterLink],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto implements OnInit {
  whatsapp = environment.whatsappNumber;
  lotes: LoteData[] = [];

  form = {
    nombre: '',
    telefono: '',
    email: '',
    tipo: '',
    loteId: 0,
    mensaje: '',
    consent: false,
  };

  errors = {
    nombre: '',
    telefono: '',
    email: '',
    tipo: '',
    loteId: '',
    consent: '',
  };

  submitted = false;
  sent = false;
  sending = false;

  private readonly emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private readonly phoneRe = /^(\+?\d{1,3})?[\s\-.]?\(?\d{2,4}\)?[\s\-.]?\d{2,4}[\s\-.]?\d{2,4}$/;

  constructor(private loteService: LoteService) {}

  ngOnInit(): void {
    this.loteService.getLotes({ limit: 50 }).subscribe({
      next: (res) => {
        if (res.status === '1' && res.data) {
          this.lotes = (res.data as any).propiedades || [];
        }
      },
    });
  }

  private validar(): boolean {
    let ok = true;
    this.errors = { nombre: '', telefono: '', email: '', tipo: '', loteId: '', consent: '' };

    if (!this.form.nombre || this.form.nombre.trim().length < 3) {
      this.errors.nombre = this.form.nombre ? 'Mínimo 3 caracteres' : 'Requerido';
      ok = false;
    }

    if (!this.form.telefono) {
      this.errors.telefono = 'Requerido';
      ok = false;
    } else if (!this.phoneRe.test(this.form.telefono.trim())) {
      this.errors.telefono = 'Formato inválido (ej: 3884465970)';
      ok = false;
    }

    if (!this.form.email) {
      this.errors.email = 'Requerido';
      ok = false;
    } else if (!this.emailRe.test(this.form.email.trim())) {
      this.errors.email = 'Email inválido';
      ok = false;
    }

    if (!this.form.tipo) {
      this.errors.tipo = 'Seleccioná una opción';
      ok = false;
    }

    if (this.form.tipo === 'lotes' && !this.form.loteId) {
      this.errors.loteId = 'Seleccioná un lote';
      ok = false;
    }

    if (!this.form.consent) {
      this.errors.consent = 'Debés aceptar la Política de Privacidad';
      ok = false;
    }

    return ok;
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.validar()) return;

    this.sending = true;

    const tipoTexto = this.form.tipo === 'lotes' ? 'Lotes' : 'Construcción';
    const loteSel = this.lotes.find(l => l.id === this.form.loteId);

    const parts = [
      `Hola, soy ${this.form.nombre.trim()}.`,
      `Teléfono: ${this.form.telefono.trim()}`,
      `Email: ${this.form.email.trim()}`,
      `Consulta sobre: ${tipoTexto}`,
    ];
    if (loteSel) {
      const sector = loteSel.manzana ? `Sector ${loteSel.manzana}` : '';
      const loteNum = loteSel.lote_num ? `Lote ${loteSel.lote_num}` : '';
      parts.push(`Lote de interés: ${loteSel.titulo}${sector || loteNum ? ` (${[sector, loteNum].filter(Boolean).join(', ')})` : ''}`);
    }
    if (this.form.mensaje.trim()) parts.push(`Mensaje: ${this.form.mensaje.trim()}`);

    const msg = encodeURIComponent(parts.join('\n'));
    window.open(`https://wa.me/${this.whatsapp}?text=${msg}`, '_blank');

    this.sent = true;
    this.form = { nombre: '', telefono: '', email: '', tipo: '', loteId: 0, mensaje: '', consent: false };
    this.errors = { nombre: '', telefono: '', email: '', tipo: '', loteId: '', consent: '' };
    this.submitted = false;
    this.sending = false;
  }
}
