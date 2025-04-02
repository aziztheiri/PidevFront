import { Routes } from '@angular/router';
import { AppDashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './user/home/home.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './admin/users/users.component';
import { MesdevisComponent } from './user/mesdevis/mesdevis.component';
import { MessinistresComponent } from './user/messinistres/messinistres.component';
import { MesreclamationsComponent } from './user/mesreclamations/mesreclamations.component';
import { SinistreListComponent } from './user/sinistre-list/sinistre-list.component';
import { SinistreDetailComponent } from './user/sinistre-detail/sinistre-detail.component';
import { SinistreFormComponent } from './user/sinistre-form/sinistre-form.component';

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
  { path: 'sinistre-list', component: SinistreListComponent ,data: { title: 'Sinistre-list' }},
  { path: 'sinistre-detail/:id', component: SinistreDetailComponent },
  { path: 'sinistre-form', component: SinistreFormComponent },
{ path: 'sinistre-form/:id', component: SinistreFormComponent },

];