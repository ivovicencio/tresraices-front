import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeadService } from '../../../core/services/lead';
import { Lead } from '../../../models/lead.model';

@Component({
  selector: 'app-leads',
  imports: [FormsModule, DatePipe],
  templateUrl: './leads.html',
  styleUrl: './leads.css',
})
export class Leads implements OnInit {
  leads: Lead[] = [];
  loading = true;
  error = '';
  page = 1;
  totalPages = 1;
  filterEstado = '';

  constructor(private leadService: LeadService) {}

  ngOnInit(): void {
    this.loadLeads();
  }

  loadLeads(): void {
    this.loading = true;
    this.leadService
      .getLeads({ page: this.page, limit: 20, estado: this.filterEstado || undefined })
      .subscribe({
        next: (res) => {
          if (res.status === '1' && res.data) {
            this.leads = res.data['leads'] as Lead[];
            this.totalPages = res.data.totalPages;
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar solicitudes';
          this.loading = false;
        },
      });
  }

  updateStatus(lead: Lead, estado: string): void {
    this.leadService.updateLeadStatus(lead.id, estado).subscribe({
      next: (res) => {
        if (res.status === '1') this.loadLeads();
      },
      error: (err) => {
        alert(err.error?.msg || 'Error al actualizar');
      },
    });
  }

  filterByEstado(estado: string): void {
    this.filterEstado = estado;
    this.page = 1;
    this.loadLeads();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadLeads();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadLeads();
    }
  }
}
