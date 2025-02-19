import { Component } from '@angular/core';

@Component({
  selector: 'app-assurance-prevoyance',
  templateUrl: './assurance-prevoyance.component.html',
  styleUrls: ['./assurance-prevoyance.component.scss'],
})
export class AssurancePrevoyanceComponent {
  formSubmitted = false; // Track if the first form is submitted
  decesAccidentel = false; // Track if "Décès accidentel" is checked
  decesAccidentelMontant = 0; // Track the value of "Décès accidentel"
  invaliditePartielle = false; // Track if "Invalidité partielle" is checked
  incapaciteTemporaire = false; // Track if "Incapacité temporaire" is checked
  capitalDeces = 0; // Track the value of "Capital décès"

  // Handle form submission
  onSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission
    console.log('Form submitted'); // Log to verify the method is called
    this.formSubmitted = true;
  }

  // Handle "Décès accidentel" checkbox change
  onDecesAccidentelChange() {
    if (!this.decesAccidentel) {
      this.decesAccidentelMontant = 0; // Reset "Décès accidentel" value if unchecked
      this.invaliditePartielle = false; // Reset "Invalidité partielle" if unchecked
      this.incapaciteTemporaire = false; // Reset "Incapacité temporaire" if unchecked
    }
  }

  // Handle "Invalidité partielle" checkbox change
  onInvaliditePartielleChange() {
    if (!this.invaliditePartielle) {
      this.incapaciteTemporaire = false; // Reset "Incapacité temporaire" if unchecked
    }
  }

  // Handle "Obtenir Devis" button click
  obtenirDevis() {
    alert('Votre devis a été envoyé par email.');
  }
}