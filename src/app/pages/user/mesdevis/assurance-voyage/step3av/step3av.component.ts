import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssuranceVoyageComponent } from '../assurance-voyage.component'; // Import AssuranceVoyageComponent

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

  step1Data: any;
  step2Data: any;

  constructor(private router: Router, private assuranceVoyageComponent: AssuranceVoyageComponent) {
    const navigation = this.router.getCurrentNavigation();
    this.step1Data = navigation?.extras.state?.['step1Data'];
    this.step2Data = navigation?.extras.state?.['step2Data'];
  }

  goBack(): void {
    this.router.navigate(['/user/mesdevis/assurance-voyage/step2']);
  }

  proceedToPayment(): void {
    if (this.validateForm()) {
      const step3Data = {
        cin: this.cin,
        lastName: this.lastName,
        firstName: this.firstName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        confirmEmail: this.confirmEmail,
        termsAccepted: this.termsAccepted
      };

      // Save Voyage and Devis
      this.assuranceVoyageComponent.saveVoyageAndDevis(this.step1Data, this.step2Data, step3Data);
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