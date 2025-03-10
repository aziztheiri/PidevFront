import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './pages.routing.module';
import { MaterialModule } from '../material.module'; // Import MaterialModule
import {MatIconModule} from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Add ReactiveFormsModule if needed
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

// Components
import { AppDashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { LoginComponent } from './login/login.component';
import { DemanderDevisComponent } from './user/mesdevis/demander-devis/demander-devis.component';
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
import { DevisComponent } from './admin/devis/devis.component';
import { DevisDetailsComponent } from './admin/devis-details/devis-details.component';
import { DetailsDevisComponent } from './user/mesdevis/details-devis/details-devis.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { LogoutComponent } from './logout/logout.component';
import { KeycloakAngularModule } from 'keycloak-angular';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { HomeComponent } from './user/home/home.component';
import { SafeHtmlPipe } from './user/home/pipe';
import { CleanContentPipe } from './user/home/clean';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './user/signup/signup.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { PaiementComponent } from './admin/paiement/paiement/paiement.component';
import { PaiementfrontComponent } from './user/mespaiements/paiementfront/paiementfront.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppDashboardComponent,
    UsersComponent,
    LoginComponent,
    SignupComponent,
    OtpVerificationComponent,
    LogoutComponent,
    UpdateUserComponent,
    UserProfileComponent,
    HomeComponent,
    SafeHtmlPipe,
    CleanContentPipe,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DemanderDevisComponent,
    ConsulterDevisComponent,
    AssuranceScolaireComponent,
    AssuranceVoyageComponent,
    AssuranceHabitationComponent,
    AssuranceAccidentsComponent,
    AssuranceCapitalisationComponent,
    AssurancePrevoyanceComponent,
    AssuranceSanteInternationaleComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step1avComponent,
    Step2avComponent,
    Step3avComponent,
    SuccessMessageComponent,
    FormComponent,
    DevisComponent,
    DevisDetailsComponent,
    DetailsDevisComponent,
    PaiementComponent,
    PaiementfrontComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatIconModule, // Import MaterialModule here
    FormsModule,
    ReactiveFormsModule, // Add if you're using reactive forms
    NgApexchartsModule,
    NgxChartsModule,
    KeycloakAngularModule,
    MatCardModule,
    RouterModule.forChild(PagesRoutes),
    TablerIconsModule.pick(TablerIcons),
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    FontAwesomeModule
  ],
  exports: [TablerIconsModule],
})
export class PagesModule {}