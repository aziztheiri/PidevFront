import { Component } from '@angular/core';

@Component({
  selector: 'app-assurance-capitalisation',
  templateUrl: './assurance-capitalisation.component.html',
  styleUrls: ['./assurance-capitalisation.component.scss'],
})
export class AssuranceCapitalisationComponent {
  formSubmitted = false; // Track if the first form is submitted

  // Handle form submission
  onSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission
    console.log('Form submitted'); // Log to verify the method is called
    this.formSubmitted = true;
  }

  // Handle "Obtenir Devis" button click
  obtenirDevis() {
    alert('Votre devis a été envoyé par email.');
  }
}