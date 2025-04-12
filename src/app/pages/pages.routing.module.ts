import { Routes } from '@angular/router';
import { AppDashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './user/home/home.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './admin/users/users.component';
import { MesdevisComponent } from './user/mesdevis/mesdevis.component';
import { LogoutComponent } from './logout/logout.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
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
import { PaiementfrontComponent } from "./user/mespaiements/paiementfront/paiementfront.component";
import { PaymentsComponent } from './user/payments/payments.component';
import { PostListComponent } from './user/post-list/post-list.component';
import { MyPostsComponent } from './user/my-posts/my-posts.component';
import { SinistreListComponent } from './user/sinistre-list/sinistre-list.component';
import { SinistreFormComponent } from './user/sinistre-form/sinistre-form.component';
import { SinistreDetailComponent } from './user/sinistre-detail/sinistre-detail.component';
import { QuizComponent } from './user/quiz/quiz.component';



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
  { path: 'paiement',
    component: PaiementfrontComponent,
    data: { title: 'Paiement' },
  },
  {
    path: 'reclamations',
    component: MesreclamationsComponent,
    data: { title: 'Reclamations' },
  },
  {
    path: 'payments',
    component: PaymentsComponent,
    data: { title: 'Payements' },
  },
  {
    path: 'posts',
    component: PostListComponent,
    data: { title: 'Posts' },
  },
  {
    path: 'myposts',
    component: MyPostsComponent,
    data: { title: 'MyPosts' },
  },
  {
    path: 'quiz',
    component: QuizComponent,
    data: { title: 'Quiz' },
  },
  { path: 'sinistre-list', component: SinistreListComponent ,data: { title: 'Sinistre-list' }},
  { path: 'sinistre-form', component: SinistreFormComponent },
  { path: 'sinistre-form/:id', component: SinistreFormComponent },
  { path: 'sinistre-detail/:id', component: SinistreDetailComponent }


];