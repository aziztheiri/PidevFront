import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ReponseComponent } from './reponse/reponse.component';

const adminRoutes: Routes = [
  { path: 'dashboard', component: AppDashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'reponse', component: ReponseComponent },

];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
