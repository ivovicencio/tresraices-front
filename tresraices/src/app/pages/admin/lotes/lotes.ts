import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoteService } from '../../../core/services/lote';
import { Lote } from '../../../models/lote.models';

@Component({
  selector: 'app-lotes',
  imports: [FormsModule],
  templateUrl: './lotes.html',
  styleUrl: './lotes.css',
})
export class Lotes implements OnInit {
  lotes: Lote[] = [];
  loading = true;
  error = '';
  page = 1;
  totalPages = 1;

  showForm = false;
  editing = false;
  formData: any = {};
  formError = '';

  constructor(private loteService: LoteService) {}

  ngOnInit(): void {
    this.loadLotes();
  }

  loadLotes(): void {
    this.loading = true;
    this.loteService.getLotes({ page: this.page, limit: 20 }).subscribe({
      next: (res) => {
        if (res.status === '1' && res.data) {
          this.lotes = res.data['propiedades'] as Lote[];
          this.totalPages = res.data.totalPages;
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar lotes';
        this.loading = false;
      },
    });
  }

  openCreate(): void {
    this.editing = false;
    this.formData = { titulo: '', precio: '', estado: 'Disponible', superficie: '', ubicacion: '', manzana: '', lote_num: '' };
    this.showForm = true;
    this.formError = '';
  }

  openEdit(lote: Lote): void {
    this.editing = true;
    this.formData = { ...lote };
    this.showForm = true;
    this.formError = '';
  }

  save(): void {
    if (!this.formData.titulo) {
      this.formError = 'El título es requerido';
      return;
    }

    const payload: Record<string, any> = { ...this.formData };
    if (payload['precio']) payload['precio'] = String(payload['precio']);
    if (payload['superficie']) payload['superficie'] = String(payload['superficie']);
    delete payload['id'];
    delete payload['created_at'];
    delete payload['inmobiliaria_nombre'];
    delete payload['inmobiliaria_direccion'];

    const obs = this.editing
      ? this.loteService.updateLote(this.formData['id'], payload)
      : this.loteService.createLote(payload);

    obs.subscribe({
      next: (res) => {
        if (res.status === '1') {
          this.showForm = false;
          this.loadLotes();
        } else {
          this.formError = res.msg;
        }
      },
      error: (err) => {
        this.formError = err.error?.msg || 'Error al guardar';
      },
    });
  }

  deleteLote(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este lote?')) return;
    this.loteService.deleteLote(id).subscribe({
      next: (res) => {
        if (res.status === '1') this.loadLotes();
      },
      error: (err) => {
        alert(err.error?.msg || 'Error al eliminar');
      },
    });
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadLotes();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadLotes();
    }
  }
}
