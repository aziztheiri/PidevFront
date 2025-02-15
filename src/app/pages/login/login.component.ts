// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <h2>Login</h2>
    <form (submit)="login()">
      <div>
        <label>Username:</label>
        <input type="text" [(ngModel)]="username" name="username" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" [(ngModel)]="password" name="password" required />
      </div>
      <button type="submit">Login</button>
      <div *ngIf="errorMessage" style="color: red;">{{ errorMessage }}</div>
    </form>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Save the access token (consider also saving refresh token if needed)
        const token = response.access_token;
        localStorage.setItem('accessToken', token);

        // Decode the token to get roles
        const decoded = this.authService.decodeToken(token);
        console.log(decoded);

        // Get roles from realm_access if needed
        const realmRoles: string[] = decoded.realm_access?.roles || [];
        // Get client roles from resource_access for pidev-client
        const clientRoles: string[] = decoded.resource_access?.['pidev-client']?.roles || [];

        // Check for customer role using realm roles
        if (realmRoles.includes('default-roles-pidev-realm') && realmRoles.includes('customer')) {
          this.router.navigate(['/user/home']);
        }
        // Check for admin role using client roles
        else if (clientRoles.includes('admin')) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          // Default redirection if no role matches
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Invalid credentials or server error.';
      }
    });
  }
}
