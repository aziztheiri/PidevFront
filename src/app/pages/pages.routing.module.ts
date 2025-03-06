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
import { Step1Component } from './user/mesdevis/assurance-scolaire/step1/step1.component';
import { Step2Component } from './user/mesdevis/assurance-scolaire/step2/step2.component';
import { Step3Component } from './user/mesdevis/assurance-scolaire/step3/step3.component';
import { Step1avComponent } from './user/mesdevis/assurance-voyage/step1av/step1av.component';
import { Step2avComponent } from './user/mesdevis/assurance-voyage/step2av/step2av.component';
import { Step3avComponent } from './user/mesdevis/assurance-voyage/step3av/step3av.component';
import { SuccessMessageComponent } from './user/mesdevis/assurance-sante-internationale/success-message/success-message.component';
import { FormComponent } from './user/mesdevis/assurance-habitation/form/form.component';


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
    path: 'mesdevis/assurance-scolaire',
    component: AssuranceScolaireComponent,
    data: { title: 'Assurance Scolaire' },
  },
  {
    path: 'mesdevis/assurance-voyage',
    component: AssuranceVoyageComponent,
    data: { title: 'Assurance Voyage' },
    children: [
      { path: '', redirectTo: 'step1', pathMatch: 'full' },
      { path: 'step1', component: Step1avComponent },
      { path: 'step2', component: Step2avComponent },
      { path: 'step3', component: Step3avComponent },
    ],
  },
  {
    path: 'mesdevis/assurance-habitation',
    component: AssuranceHabitationComponent,
  },
  {
    path: 'mesdevis/assurance-habitation/form/:pack',
    component: FormComponent,
  },
  {
    path: 'mesdevis/assurance-accidents',
    component: AssuranceAccidentsComponent,
    data: { title: 'Assurance Accidents' },
  },
  {
    path: 'mesdevis/assurance-capitalisation',
    component: AssuranceCapitalisationComponent,
    data: { title: 'Assurance Capitalisation' },
  },
  {
    path: 'mesdevis/assurance-prevoyance',
    component: AssurancePrevoyanceComponent,
    data: { title: 'Assurance Prévoyance' },
  },
  {
    path: 'mesdevis/assurance-sante-internationale',
    component: AssuranceSanteInternationaleComponent,
    data: { title: 'Assurance Santé Internationale' },
    children: [
      { path: 'success', component: SuccessMessageComponent },
    ],
  },
];