import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import { FullUserComponent } from './layouts/fullUser/full.component';
import { HeaderUserComponent } from './layouts/fullUser/header/header.component';
import { AppNavUserItemComponent } from './layouts/fullUser/sidebar/nav-item/nav-item.component';
import { SidebarUserComponent } from './layouts/fullUser/sidebar/sidebar.component';
// app.module.ts
import { MatNativeDateModule } from '@angular/material/core';
import { PaiementfrontComponent } from './pages/user/mespaiements/paiementfront/paiementfront.component';
import { CardFormatDirective } from './pages/user/mespaiements/paiementfront/directives/card-format.directive';
import { MapComponent } from './pages/user/mespaiements/paiementfront/map api/map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
    FullUserComponent,
    HeaderUserComponent,
    AppNavUserItemComponent,
    SidebarUserComponent,
    PaiementfrontComponent,
    CardFormatDirective,
    MapComponent
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    KeycloakAngularModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
  ],

  exports: [TablerIconsModule,MatNativeDateModule],
  bootstrap: [AppComponent],
})
export class AppModule {}