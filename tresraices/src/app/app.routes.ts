import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { MapaInteractivo } from './pages/mapa-interactivo/mapa-interactivo';
import { LoteDetalle } from './pages/lote-detalle/lote-detalle';
import { Login } from './pages/login/login';
import { Contacto } from './pages/contacto/contacto';
import { Privacidad } from './pages/legal/privacidad/privacidad';
import { Terminos } from './pages/legal/terminos/terminos';
import { Page404 } from './pages/page-404/page-404';
import { Lotes } from './pages/admin/lotes/lotes';
import { Leads } from './pages/admin/leads/leads';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'lote/:id', component: LoteDetalle },
  { path: 'mapa-interactivo', component: MapaInteractivo },
  { path: 'login', component: Login },
  { path: 'contacto', component: Contacto },
  { path: 'privacidad', component: Privacidad },
  { path: 'terminos', component: Terminos },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      { path: 'lotes', component: Lotes },
      { path: 'leads', component: Leads },
      { path: '', redirectTo: 'lotes', pathMatch: 'full' },
    ],
  },
  { path: '**', component: Page404 },
];
