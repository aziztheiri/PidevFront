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
    const step1Data = {
      selectedType: this.selectedType,
      idType: this.idType,
      idNumber: this.idNumber,
      lastName: this.lastName,
      firstName: this.firstName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      termsAccepted: this.termsAccepted,
      fiscalId: this.fiscalId,
      companyName: this.companyName
    };

    this.router.navigate(['/user/mesdevis/assurance-scolaire/step2'], { state: { step1Data } });
  }
}