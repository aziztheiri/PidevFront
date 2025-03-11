import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { DevisComponent } from './devis/devis.component';
import { DevisDetailsComponent } from './devis-details/devis-details.component';
import { PaiementComponent } from './paiement/paiement/paiement.component';  // Assure-toi que ce chemin est correct
import { ReponseComponent } from './reponse/reponse.component';

const adminRoutes: Routes = [
  { path: 'dashboard', component: AppDashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'devis', component: DevisComponent },
  { path: 'devis-details/:id', component: DevisDetailsComponent },
  { path: 'paiement', component: PaiementComponent },  // Ajoute cette route pour PaiementComponent

  { path: 'reponse', component: ReponseComponent },

];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
