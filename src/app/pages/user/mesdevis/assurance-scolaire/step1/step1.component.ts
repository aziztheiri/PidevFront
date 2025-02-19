import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component {
  selectedType: 'female' | 'male' | 'etablissement' = 'female';
  idType: string = '';
  idNumber: string = '';
  lastName: string = '';
  firstName: string = '';
  phoneNumber: string = '';
  email: string = '';
  termsAccepted: boolean = false;
  fiscalId: string = '';
  companyName: string = '';

  constructor(private router: Router) {}

  selectType(type: 'female' | 'male' | 'etablissement') {
    this.selectedType = type;
  }

  nextStep() {
    if (this.selectedType === 'female' || this.selectedType === 'male') {
      // Handle individual form submission
      console.log({
        idType: this.idType,
        idNumber: this.idNumber,
        lastName: this.lastName,
        firstName: this.firstName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        termsAccepted: this.termsAccepted
      });
    } else if (this.selectedType === 'etablissement') {
      // Handle establishment form submission
      console.log({
        fiscalId: this.fiscalId,
        companyName: this.companyName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        termsAccepted: this.termsAccepted
      });
    }

    this.router.navigate(['/user/mesdevis/assurance-scolaire/step2']);
  }
}