import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoteService } from '../../core/services/lote';
import { LeadService } from '../../core/services/lead';
import { Lote } from '../../models/lote.models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-lote-detalle',
  imports: [RouterLink, FormsModule],
  templateUrl: './lote-detalle.html',
  styleUrl: './lote-detalle.css',
})
export class LoteDetalle implements OnInit {
  lote: Lote | null = null;
  loading = true;
  error = '';

  leadForm = {
    nombre: '',
    telefono: '',
    email: '',
    mensaje: '',
  };
  submitted = false;
  successMsg = '';
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private loteService: LoteService,
    private leadService: LeadService
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
    const { nombre, telefono, email, mensaje } = this.leadForm;
    if (!nombre || !telefono || !email) return;

    this.leadService
      .createLead({ nombre, telefono, email, propiedad_id: this.lote.id, mensaje })
      .subscribe({
        next: (res) => {
          if (res.status === '1') {
            this.successMsg = 'Solicitud enviada con éxito. Nos pondremos en contacto pronto.';
            this.leadForm = { nombre: '', telefono: '', email: '', mensaje: '' };
            this.submitted = false;
          } else {
            this.errorMsg = res.msg;
          }
        },
        error: () => {
          this.errorMsg = 'Error al enviar la solicitud. Intente nuevamente.';
        },
      });
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
