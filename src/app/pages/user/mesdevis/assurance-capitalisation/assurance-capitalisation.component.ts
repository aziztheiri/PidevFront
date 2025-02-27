import { Component } from '@angular/core';
import { CapitalisationService } from '../../../../services/capitalisation.service'; // Import CapitalisationService
import { DevisService } from '../../../../services/devis.service'; // Import DevisService
import { Capitalisation } from '../../../../models/capitalisation.model'; // Import Capitalisation model
import { Devis } from '../../../../models/devis.model'; // Import Devis model

@Component({
  selector: 'app-assurance-capitalisation',
  templateUrl: './assurance-capitalisation.component.html',
  styleUrls: ['./assurance-capitalisation.component.scss'],
})
export class AssuranceCapitalisationComponent {
  formSubmitted = false; // Track if the first form is submitted

  constructor(
    private capitalisationService: CapitalisationService,
    private devisService: DevisService
  ) {}

  // Handle form submission
  onSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission
    console.log('Form submitted'); // Log to verify the method is called
    this.formSubmitted = true;
  }

  // Handle "Obtenir Devis" button click
  obtenirDevis() {
    // Collect data from the second form
    const capitalisationData = {
      dateEffet: (document.querySelector('[name="dateEffet"]') as HTMLInputElement).value,
      duree: (document.querySelector('[name="duree"]') as HTMLInputElement).value,
      capitalInitial: (document.querySelector('[name="capitalInitial"]') as HTMLInputElement).value,
      versementRegulier: (document.querySelector('[name="versementRegulier"]') as HTMLInputElement).value,
      frequence: (document.querySelector('[name="frequence"]') as HTMLInputElement).value, // Correctly map frequence
      primeVariable: (document.querySelector('[name="primeVariable"]') as HTMLInputElement).checked, // Directly use boolean value
      nom: (document.querySelector('[name="nom"]') as HTMLInputElement).value,
      prenom: (document.querySelector('[name="prenom"]') as HTMLInputElement).value,
      mail: (document.querySelector('[name="email"]') as HTMLInputElement).value,
      telephone: (document.querySelector('[name="telephone"]') as HTMLInputElement).value,
    };

    // Save Capitalisation data
    this.saveCapitalisation(capitalisationData);
  }

  saveCapitalisation(capitalisationData: any): void {
    const capitalisation: Capitalisation = {
      dateEffet: new Date(capitalisationData.dateEffet), // Convert string to Date
      duree: +capitalisationData.duree, // Convert string to number
      capitalInitial: +capitalisationData.capitalInitial, // Convert string to number
      versementRegulier: +capitalisationData.versementRegulier, // Convert string to number
      frequence: capitalisationData.frequence, // Correctly map frequence
      primeVariable: capitalisationData.primeVariable, // Directly use boolean value
      nom: capitalisationData.nom,
      prenom: capitalisationData.prenom,
      mail: capitalisationData.mail,
      telephone: capitalisationData.telephone,
    };

    this.capitalisationService.createCapitalisation(capitalisation).subscribe(
      (response) => {
        console.log('Capitalisation saved:', response);

        // Check if response.id is defined
        if (response.id !== undefined) {
          this.saveDevis(response.id); // Pass the ID of the saved Capitalisation to saveDevis
        } else {
          console.error('Error: Capitalisation ID is undefined');
          alert('Une erreur s\'est produite lors de la création du devis.');
        }
      },
      (error) => {
        console.error('Error saving Capitalisation:', error);
      }
    );
  }

  // Save Devis data
  saveDevis(capitalisationId: number): void {
    const devis: Devis = {
      montant: 0, // Set a default value or calculate based on your logic
      dateCalcul: new Date(), // Current date
      typeAssurance: 'CAPITALISATION', // Hardcoded value matching the Spring enum
      idAssurance: capitalisationId, // Use the ID of the saved Capitalisation
      statut: 'EN_COURS', // Hardcoded value matching the Spring enum
      dateDebutContrat: new Date(), // Set a default value or calculate based on your logic
      dateFinContrat: new Date(), // Set a default value or calculate based on your logic
    };

    this.devisService.createDevis(devis).subscribe(
      (response) => {
        console.log('Devis saved:', response);
        alert('Votre devis a été envoyé par email.'); // Show success message
      },
      (error) => {
        console.error('Error saving Devis:', error);
      }
    );
  }
}