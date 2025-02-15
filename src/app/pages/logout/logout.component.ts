// logout.component.ts
import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-logout',
  template: `<button (click)="logout()">Logout</button>`
})
export class LogoutComponent {
  constructor(private keycloakService: KeycloakService) {}

  logout(): void {
    // This will log the user out and then redirect to the specified URL.
    // Make sure that this redirect URI is registered in Keycloak as a valid redirect.
    this.keycloakService.logout(window.location.origin + '/login');
  }
}
