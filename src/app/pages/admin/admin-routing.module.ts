import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AdminSinistreListComponent } from '../admin-sinistre-list/admin-sinistre-list.component'; // Import du composant

const adminRoutes: Routes = [
  { path: 'dashboard', component: AppDashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'admin-sinistre-list', component: AdminSinistreListComponent }, // Route pour le composant des sinistres
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes),  ],  // Ajout de la configuration des routes admin
  exports: [RouterModule],
})
export class AdminRoutingModule {}

