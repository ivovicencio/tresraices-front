import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoteService } from '../../core/services/lote';
import { Lote } from '../../models/lote.models';

@Component({
  selector: 'app-mapa',
  imports: [RouterLink],
  templateUrl: './mapa.html',
  styleUrl: './mapa.css',
})
export class Mapa implements OnInit {
  lotes: Lote[] = [];
  loadingLotes = true;

  constructor(private loteService: LoteService) {}

  ngOnInit(): void {
    this.loteService
      .getLotes({ limit: 6, estado: 'Disponible' })
      .subscribe({
        next: (res) => {
          if (res.status === '1' && res.data) {
            this.lotes = res.data['propiedades'] as Lote[];
          }
          this.loadingLotes = false;
        },
        error: () => {
          this.loadingLotes = false;
        },
      });
  }
}
