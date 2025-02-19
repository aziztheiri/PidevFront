import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step3av',
  templateUrl: './step3av.component.html',
  styleUrls: ['./step3av.component.scss']
})
export class Step3avComponent {
  cin: string = '';
  lastName: string = '';
  firstName: string = '';
  phoneNumber: string = '';
  email: string = '';
  confirmEmail: string = '';
  termsAccepted: boolean = false;

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/previous-page']); // Replace with actual previous page route
  }

  proceedToPayment(): void {
    if (this.validateForm()) {
      this.router.navigate(['/payment']); // Replace with actual payment page route
    }
  }

  validateForm(): boolean {
    if (!this.cin || !this.lastName || !this.firstName || !this.phoneNumber || !this.email || !this.confirmEmail) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return false;
    }

    if (this.email !== this.confirmEmail) {
      alert('Les adresses email ne correspondent pas.');
      return false;
    }

    if (!this.termsAccepted) {
      alert('Vous devez accepter les conditions avant de continuer.');
      return false;
    }

    return true;
  }
}
