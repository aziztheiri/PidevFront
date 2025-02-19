import { Component } from '@angular/core';

@Component({
  selector: 'app-assurance-accidents',
  templateUrl: './assurance-accidents.component.html',
  styleUrls: ['./assurance-accidents.component.scss'],
})
export class AssuranceAccidentsComponent {
  formSubmitted: boolean = false;

  onSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission
    this.formSubmitted = true; // Show the email form
  }

  obtenirDevis() {
    // Logic to send the email or handle the request
    console.log('Devis envoyé par email');
  }
}