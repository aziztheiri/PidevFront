import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './pages.routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { AppDashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { LoginComponent } from './login/login.component';
import { SinistreListComponent } from './user/sinistre-list/sinistre-list.component';
import { SinistreDetailComponent } from './user/sinistre-detail/sinistre-detail.component';
import { SinistreFormComponent } from './user/sinistre-form/sinistre-form.component';

@NgModule({
  declarations: [
    AppDashboardComponent,
    UsersComponent,
    LoginComponent,
    SinistreListComponent,
    SinistreDetailComponent,
    SinistreFormComponent
  ],
  imports: [
    
    CommonModule,
    MaterialModule,
    FormsModule ,
    NgApexchartsModule,
    RouterModule.forChild(PagesRoutes), // Utilisation de forChild ici
    TablerIconsModule.pick(TablerIcons),
  ],
  exports: [TablerIconsModule],
})
export class PagesModule {}

