// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',  
  styleUrls: ['./login.component.scss']  
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
      
      // Check if the error response includes a description
      if (err.error && err.error.error_description) {
        const description = err.error.error_description.toLowerCase();
        if (description.includes('disabled')) {
          this.errorMessage = 'Your account is disabled. Please contact support.';
        } else {
          this.errorMessage = err.error.error_description;
        }
      } else {
        this.errorMessage = 'Invalid credentials.';
      }
    }
  });
  }
}
