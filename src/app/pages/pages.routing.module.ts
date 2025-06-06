import { Routes } from '@angular/router';
import { AppDashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './user/home/home.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './admin/users/users.component';
import { MesdevisComponent } from './user/mesdevis/mesdevis.component';
import { MessinistresComponent } from './user/messinistres/messinistres.component';
import { MesreclamationsComponent } from './user/mesreclamations/mesreclamations.component';
import { LogoutComponent } from './logout/logout.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

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
  {
    path: 'logout',
    component: LogoutComponent,
    data: { title: 'logout' },
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    data: { title: 'profile' },
  },
  {
    path: 'updatePassword',
    component: UpdateUserComponent,
    data: { title: 'updatePassword' },
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { title: 'forgot-password' },
  },
  {
    path: 'reset-password',
    component: ForgotPasswordComponent,
    data: { title: 'forgot-password' },
  },

];