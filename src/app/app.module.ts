import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { CardFormatDirective } from './pages/user/mespaiements/paiementfront/directives/card-format.directive';
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
import { PaiementfrontComponent } from './pages/user/mespaiements/paiementfront/paiementfront.component';
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    
    PaiementfrontComponent,
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
    CardFormatDirective,
    SidebarUserComponent,

  ],
  imports: [
  
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    HammerModule,
    FontAwesomeModule,
    TablerIconsModule.pick(TablerIcons),

  ],
  exports: [TablerIconsModule,  CardFormatDirective,],
  bootstrap: [AppComponent],
})
export class AppModule {constructor() {
  library.add(faArrowLeft, faArrowRight); // Ajoutez les icônes ici
}}
