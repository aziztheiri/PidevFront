import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './pages.routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ToastrModule } from 'ngx-toastr';

// Icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

// Components
import { AppDashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { LoginComponent } from './login/login.component';
import { SinistreListComponent } from './user/sinistre-list/sinistre-list.component';
import { SinistreDetailComponent } from './user/sinistre-detail/sinistre-detail.component';
import { SinistreFormComponent } from './user/sinistre-form/sinistre-form.component';

// Services
import { NotificationService } from '../services/notification.service';  // Service de notification

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
    FormsModule,
    NgApexchartsModule,
    RouterModule.forChild(PagesRoutes),
    TablerIconsModule.pick(TablerIcons),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  exports: [TablerIconsModule],
  providers: [NotificationService]  // Fournisseur du service
})
export class PagesModule {}


