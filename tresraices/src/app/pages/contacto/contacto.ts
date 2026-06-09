import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { LoteService } from '../../core/services/lote';
import { Lote } from '../../models/lote.models';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto implements OnInit {
  whatsapp = environment.whatsappNumber;
  lotes: Lote[] = [];

  form = {
    nombre: '',
    telefono: '',
    email: '',
    tipo: '',
    loteId: 0,
    mensaje: '',
  };

  submitted = false;
  sent = false;
  sending = false;

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

  onSubmit(): void {
    this.submitted = true;
    if (!this.form.nombre || !this.form.telefono || !this.form.email || !this.form.tipo) return;

    this.sending = true;

    const tipoTexto = this.form.tipo === 'lotes' ? 'Lotes' : 'Construcción';
    const loteSel = this.lotes.find(l => l.id === this.form.loteId);

    const parts = [
      `Hola, soy ${this.form.nombre}.`,
      `Teléfono: ${this.form.telefono}`,
      `Email: ${this.form.email}`,
      `Consulta sobre: ${tipoTexto}`,
    ];
    if (loteSel) {
      const sector = loteSel.manzana ? `Sector ${loteSel.manzana}` : '';
      const loteNum = loteSel.lote_num ? `Lote ${loteSel.lote_num}` : '';
      parts.push(`Lote de interés: ${loteSel.titulo}${sector || loteNum ? ` (${[sector, loteNum].filter(Boolean).join(', ')})` : ''}`);
    }
    if (this.form.mensaje) parts.push(`Mensaje: ${this.form.mensaje}`);

    const msg = encodeURIComponent(parts.join('\n'));
    window.open(`https://wa.me/${this.whatsapp}?text=${msg}`, '_blank');

    this.sent = true;
    this.form = { nombre: '', telefono: '', email: '', tipo: '', loteId: 0, mensaje: '' };
    this.submitted = false;
    this.sending = false;
  }
}
