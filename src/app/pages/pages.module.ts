import { NgModule, Pipe } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './pages.routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { AppDashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { OtpVerificationComponent } from './user/otp-verification/otp-verification.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';
import { LogoutComponent } from './logout/logout.component';
import { KeycloakAngularModule } from 'keycloak-angular';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { HomeComponent } from './user/home/home.component';
import { SafeHtmlPipe } from './user/home/pipe';
import { CleanContentPipe } from './user/home/clean';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [AppDashboardComponent,UsersComponent,LoginComponent,SignupComponent,OtpVerificationComponent,LogoutComponent,UserProfileComponent,UpdateUserComponent,HomeComponent,SafeHtmlPipe,CleanContentPipe,ForgotPasswordComponent,ResetPasswordComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    NgxChartsModule,
    KeycloakAngularModule,
    MatCardModule,
    RouterModule.forChild(PagesRoutes),
    TablerIconsModule.pick(TablerIcons),
  ],
  exports: [TablerIconsModule],
})
export class PagesModule {}
