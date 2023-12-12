import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PersonajesComponent } from './components/personajes/personajes.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { FormAddComponent } from './components/form-add/form-add.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'personajes', component: PersonajesComponent },
  { path: 'formAdd', component: FormAddComponent },
  { path: 'detalles/:id', component: DetalleComponent },
  { path: 'about', component: AboutComponent },
];
