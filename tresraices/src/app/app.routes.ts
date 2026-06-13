import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { MapaInteractivo } from './pages/mapa-interactivo/mapa-interactivo';
import { LoteDetalle } from './pages/lote-detalle/lote-detalle';
import { Contacto } from './pages/contacto/contacto';
import { Privacidad } from './pages/legal/privacidad/privacidad';
import { Terminos } from './pages/legal/terminos/terminos';
import { Page404 } from './pages/page-404/page-404';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'lote/:id', component: LoteDetalle },
  { path: 'mapa-interactivo', component: MapaInteractivo },
  { path: 'contacto', component: Contacto },
  { path: 'privacidad', component: Privacidad },
  { path: 'terminos', component: Terminos },
  { path: '**', component: Page404 },
];
