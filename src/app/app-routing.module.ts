// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/user/signup/signup.component';
import { OtpVerificationComponent } from './pages/user/otp-verification/otp-verification.component';
import { FullComponent } from './layouts/full/full.component';
import { FullUserComponent } from './layouts/fullUser/full.component';
import { AuthGuard } from './services/auth.guard'; 
import { RoleGuard } from './services/role.guard';
import { NotfoundComponent } from './pages/notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '404', component: NotfoundComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify', component: OtpVerificationComponent },
  {
    path: 'admin',
    component: FullComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: { roles: ['admin'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: '',
        loadChildren: () =>
          import('./pages/admin/admin-routing.module').then((m) => m.AdminRoutingModule)
      }
    ]
  },
  {
    path: 'user',
    component: FullUserComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: { roles: ['customer'] },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule)
      }
    ]
  },
  { path: '**', redirectTo: '404' },
  // Additional routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
