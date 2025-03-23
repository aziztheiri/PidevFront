// login.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
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
  recaptchaToken: string | null = null;
  recaptchaError = '';
  recaptchaSiteKey = '6Lcrf_0qAAAAAFkxgS2zyQ0xB83KyPfcFe-ZNMVi';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Définir la fonction de callback globale pour reCAPTCHA
    (window as any).recaptchaCallback = (token: string) => {
      this.recaptchaToken = token;
      this.recaptchaError = '';
    };

    this.loadRecaptchaScript();
  }

  private loadRecaptchaScript(): void {
    if (!document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]')) {
      const script = document.createElement('script');
      // Charger le script sans paramètres explicites pour laisser Google gérer le rendu automatique
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }
  login(): void {
    if (!this.recaptchaToken) {
      this.recaptchaError = "Veuillez vérifier que vous n'êtes pas un robot";
      return;
    }
    this.authService.login(this.username, this.password, this.recaptchaToken).subscribe({
      next: (response) => {
        // Réinitialiser le widget reCAPTCHA
        if ((window as any)['grecaptcha']) {
          (window as any)['grecaptcha'].reset();
        }
        // Sauvegarder le token d'accès et traiter la réponse
        const token = response.access_token;
        localStorage.setItem('accessToken', token);

        const decoded = this.authService.decodeToken(token);
        console.log(decoded);

        const realmRoles: string[] = decoded.realm_access?.roles || [];
        const clientRoles: string[] = decoded.resource_access?.['pidev-client']?.roles || [];

        if (realmRoles.includes('default-roles-pidev-realm') && realmRoles.includes('customer')) {
          this.router.navigate(['/user/home']);
        } else if (clientRoles.includes('admin')) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error(err);
        if ((window as any)['grecaptcha']) {
          (window as any)['grecaptcha'].reset();
        }
        this.recaptchaToken = null;
        if (err.status === 400 && err.error === 'reCAPTCHA verification failed') {
          this.errorMessage = 'Échec de la vérification reCAPTCHA';
        } else if (err.status === 403) {
          this.errorMessage = err.error ? err.error : 'Accès refusé : Votre compte pourrait être bloqué.';
        } else if (err.error && err.error.error_description) {
          const description = err.error.error_description.toLowerCase();
          if (description.includes('disabled')) {
            this.errorMessage = 'Votre compte est désactivé. Veuillez contacter le support.';
          } else {
            this.errorMessage = err.error.error_description;
          }
        } else {
          this.errorMessage = 'Identifiants invalides. Veuillez réessayer.';
        }
      }
    });
  }
}