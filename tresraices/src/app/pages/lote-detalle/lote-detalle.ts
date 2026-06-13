import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoteService } from '../../core/services/lote';
import { LoteData } from '../../data/lotes.data';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-lote-detalle',
  imports: [RouterLink, FormsModule],
  templateUrl: './lote-detalle.html',
  styleUrl: './lote-detalle.css',
})
export class LoteDetalle implements OnInit {
  lote: LoteData | null = null;
  loading = true;
  error = '';

  leadForm = {
    nombre: '',
    telefono: '',
    email: '',
    mensaje: '',
    consent: false,
  };
  submitted = false;
  successMsg = '';
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private loteService: LoteService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loteService.getLote(id).subscribe({
        next: (res) => {
          if (res.status === '1' && res.data?.propiedad) {
            this.lote = res.data.propiedad;
          } else {
            this.error = 'Propiedad no encontrada';
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar la propiedad';
          this.loading = false;
        },
      });
    }
  }

  submitLead(): void {
    if (!this.lote) return;
    this.submitted = true;
    this.errorMsg = '';
    this.successMsg = '';
    const { nombre, telefono, email, mensaje, consent } = this.leadForm;

    if (!nombre || !telefono || !email || !consent) {
      if (!consent) this.errorMsg = 'Debés aceptar la Política de Privacidad';
      return;
    }

    const parts = [
      `Hola, soy ${nombre.trim()}.`,
      `Teléfono: ${telefono.trim()}`,
      `Email: ${email.trim()}`,
      `Me interesa: ${this.lote.titulo} (${this.lote.manzana || ''} - Lote ${this.lote.lote_num || ''})`,
    ];
    if (mensaje.trim()) parts.push(`Mensaje: ${mensaje.trim()}`);

    const msg = encodeURIComponent(parts.join('\n'));
    window.open(`https://wa.me/${environment.whatsappNumber}?text=${msg}`, '_blank');

    this.successMsg = 'Redirigiendo a WhatsApp...';
    this.leadForm = { nombre: '', telefono: '', email: '', mensaje: '', consent: false };
    this.submitted = false;
  }

  getEstadoClass(): string {
    if (!this.lote) return '';
    switch (this.lote.estado) {
      case 'Disponible': return 'bg-success';
      case 'Reservado': return 'bg-warning text-dark';
      case 'Vendido': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  openWpp(): void {
    if (!this.lote) return;
    const msg = `Hola! Me interesa el lote: ${this.lote.titulo}`;
    window.open(`https://wa.me/${environment.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  }
}
