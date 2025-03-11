import { Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { LoginComponent } from './login/login.component';
import { MesdevisComponent } from './user/mesdevis/mesdevis.component';
import { MessinistresComponent } from './user/messinistres/messinistres.component';
import { MesreclamationsComponent } from './user/mesreclamations/mesreclamations.component';

export const PagesRoutes: Routes = [
 
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'devis',
    component: MesdevisComponent,
    data: { title: 'Devis' },
  },
  {
    path: 'sinistres',
    component: MessinistresComponent,
    data: { title: 'Sinistres' },
  },
  {
    path: 'reclamations',
    component: MesreclamationsComponent,
    data: { title: 'Reclamations' },
  },

];