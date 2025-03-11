import { NgModule } from '@angular/core';
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
import { BrowserModule } from '@angular/platform-browser';
import { MesreclamationsComponent } from './user/mesreclamations/mesreclamations.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReclamationDialogComponent } from './user/reclamation-dialog/reclamation-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDialogComponent } from './user/confirm-dialog/confirm-dialog.component';
import { ReponseComponent } from './admin/reponse/reponse.component';
import { ReponseDialogComponent } from './admin/reponse-dialog/reponse-dialog.component';
import { ReponseModalComponentComponent } from './user/reponse-modal-component/reponse-modal-component.component';
import { DescriptionModalComponent } from './user/description-modal/description-modal.component';

@NgModule({
  declarations: [AppDashboardComponent,DescriptionModalComponent,ReponseModalComponentComponent,ReponseDialogComponent,UsersComponent,LoginComponent,ConfirmDialogComponent,MesreclamationsComponent,ReclamationDialogComponent,ReponseComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    RouterModule.forChild(PagesRoutes),
    TablerIconsModule.pick(TablerIcons),
    HttpClientModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTooltipModule,

  ],
  exports: [TablerIconsModule],
})
export class PagesModule {}
