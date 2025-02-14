import { Routes } from '@angular/router';
import { AppDashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './user/home/home.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './admin/users/users.component';
import { DemanderDevisComponent } from './user/mesdevis/demander-devis/demander-devis.component';
import { MessinistresComponent } from './user/messinistres/messinistres.component';
import { MesreclamationsComponent } from './user/mesreclamations/mesreclamations.component';
import { ConsulterDevisComponent } from './user/mesdevis/consulter-devis/consulter-devis.component';
import { AssuranceScolaireComponent } from './user/mesdevis/assurance-scolaire/assurance-scolaire.component';
import { AssuranceVoyageComponent } from './user/mesdevis/assurance-voyage/assurance-voyage.component';
import { AssuranceHabitationComponent } from './user/mesdevis/assurance-habitation/assurance-habitation.component';
import { AssuranceAccidentsComponent } from './user/mesdevis/assurance-accidents/assurance-accidents.component';
import { AssuranceCapitalisationComponent } from './user/mesdevis/assurance-capitalisation/assurance-capitalisation.component';
import { AssurancePrevoyanceComponent } from './user/mesdevis/assurance-prevoyance/assurance-prevoyance.component';
import { AssuranceSanteInternationaleComponent } from './user/mesdevis/assurance-sante-internationale/assurance-sante-internationale.component';


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
    path: 'demander-devis',
    component: DemanderDevisComponent,
    data: { title: 'Demander un Devis' },
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
  {
    path: 'consulter-devis',
    component: ConsulterDevisComponent,
    data: { title: 'Consulter les Devis' },
  },
  {
    path: 'demander-devis/scolaire',
    component: AssuranceScolaireComponent,
    data: { title: 'Assurance Scolaire' },
  },
  {
    path: 'demander-devis/voyage',
    component: AssuranceVoyageComponent,
    data: { title: 'Assurance Voyage' },
  },
  {
    path: 'demander-devis/habitation',
    component: AssuranceHabitationComponent,
    data: { title: 'Assurance Habitation' },
  },
  {
    path: 'demander-devis/accidents',
    component: AssuranceAccidentsComponent,
    data: { title: 'Assurance Accidents' },
  },
  {
    path: 'demander-devis/capitalisation',
    component: AssuranceCapitalisationComponent,
    data: { title: 'Assurance Capitalisation' },
  },
  {
    path: 'demander-devis/prevoyance',
    component: AssurancePrevoyanceComponent,
    data: { title: 'Assurance Prévoyance' },
  },
  {
    path: 'demander-devis/sante-internationale',
    component: AssuranceSanteInternationaleComponent,
    data: { title: 'Assurance Santé Internationale' },
  },

];