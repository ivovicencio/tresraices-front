import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { MapaInteractivo } from './pages/mapa-interactivo/mapa-interactivo';
import { LoteDetalle } from './pages/lote-detalle/lote-detalle';
import { Login } from './pages/login/login';
import { Contacto } from './pages/contacto/contacto';
import { Lotes } from './pages/admin/lotes/lotes';
import { Leads } from './pages/admin/leads/leads';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'lote/:id', component: LoteDetalle },
  { path: 'mapa-interactivo', component: MapaInteractivo },
  { path: 'login', component: Login },
  { path: 'contacto', component: Contacto },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      { path: 'lotes', component: Lotes },
      { path: 'leads', component: Leads },
      { path: '', redirectTo: 'lotes', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
