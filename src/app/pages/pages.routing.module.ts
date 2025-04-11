import { Routes } from '@angular/router';
import { AppDashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './user/home/home.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './admin/users/users.component';
import { MesdevisComponent } from './user/mesdevis/mesdevis.component';
import { MessinistresComponent } from './user/messinistres/messinistres.component';
import { MesreclamationsComponent } from './user/mesreclamations/mesreclamations.component';
import { PaiementfrontComponent } from "./user/mespaiements/paiementfront/paiementfront.component";
import { WalletRechargeComponent } from '../pages/user/mespaiements/paiementfront/wallet-recharge/wallet-recharge.component';


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

  { path: 'paiement',
    component: PaiementfrontComponent,
    data: { title: 'Paiement' },
  },

  { path: 'paiement/wallet',
    component: WalletRechargeComponent ,
    data: { title: 'Rehcharge wallet' },
  },

];
