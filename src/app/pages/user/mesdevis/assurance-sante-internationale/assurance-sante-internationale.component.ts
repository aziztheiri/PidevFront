import { Component } from '@angular/core';
import { SanteInternationaleService } from '../../../../services/sante-internationale.service'; // Import SanteInternationaleService
import { DevisService } from '../../../../services/devis.service'; // Import DevisService
import { SanteInternationale } from '../../../../models/santeinternationale.model'; // Import SanteInternationale model
import { Devis } from '../../../../models/devis.model'; // Import Devis model
import { Router } from '@angular/router';

@Component({
  selector: 'app-assurance-sante-internationale',
  templateUrl: './assurance-sante-internationale.component.html',
  styleUrls: ['./assurance-sante-internationale.component.scss'],
})
export class AssuranceSanteInternationaleComponent {
  formSubmitted = false; // Track if the form is submitted

  constructor(
    private santeInternationaleService: SanteInternationaleService,
    private devisService: DevisService,
    private router: Router
  ) {}

  // Handle form submission
  onSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission
    console.log('Form submitted'); // Log to verify the method is called
    this.formSubmitted = true;

    // Collect data from the form
    const santeInternationaleData = {
      nom: (document.querySelector('[name="nom"]') as HTMLInputElement).value,
      prenom: (document.querySelector('[name="prenom"]') as HTMLInputElement).value,
      mail: (document.querySelector('[name="email"]') as HTMLInputElement).value,
      societe: (document.querySelector('[name="societe"]') as HTMLInputElement).value,
      fonction: (document.querySelector('[name="fonction"]') as HTMLInputElement).value,
      telephone: (document.querySelector('[name="telephone"]') as HTMLInputElement).value,
      dateNaissance: (document.querySelector('[name="dateNaissance"]') as HTMLInputElement).value,
      message: (document.querySelector('[name="message"]') as HTMLTextAreaElement).value,
    };

    // Save SanteInternationale data
    this.saveSanteInternationale(santeInternationaleData);
  }

  saveSanteInternationale(santeInternationaleData: any): void {
    const santeInternationale: SanteInternationale = {
      nom: santeInternationaleData.nom,
      prenom: santeInternationaleData.prenom,
      mail: santeInternationaleData.mail,
      societe: santeInternationaleData.societe,
      fonction: santeInternationaleData.fonction,
      telephone: santeInternationaleData.telephone,
      dateNaissance: new Date(santeInternationaleData.dateNaissance), // Convert string to Date
      message: santeInternationaleData.message,
    };

    this.santeInternationaleService.createSanteInternationale(santeInternationale).subscribe(
      (response) => {
        console.log('SanteInternationale saved:', response);

        // Check if response.id is defined
        if (response.id !== undefined) {
          this.saveDevis(response.id); // Pass the ID of the saved SanteInternationale to saveDevis
        } else {
          console.error('Error: SanteInternationale ID is undefined');
          alert('Une erreur s\'est produite lors de la création du devis.');
        }
      },
      (error) => {
        console.error('Error saving SanteInternationale:', error);
      }
    );
  }

  // Save Devis data
  saveDevis(santeInternationaleId: number): void {
    const devis: Devis = {
      montant: 0, // Set a default value or calculate based on your logic
      dateCalcul: new Date(), // Current date
      typeAssurance: 'SANTE_INTERNATIONALE', // Hardcoded value matching the Spring enum
      idAssurance: santeInternationaleId, // Use the ID of the saved SanteInternationale
      statut: 'EN_COURS', // Hardcoded value matching the Spring enum
      dateDebutContrat: new Date(), // Set a default value or calculate based on your logic
      dateFinContrat: new Date(), // Set a default value or calculate based on your logic
    };

    this.devisService.createDevis(devis).subscribe(
      (response) => {
        console.log('Devis saved:', response);
        alert('Votre devis a été envoyé par email.');
        this.redirectToSucess(); // Show success message
      },
      (error) => {
        console.error('Error saving Devis:', error);
      }
    );
  }
  redirectToSucess(){
    console.log('Form submitted!');
    this.router.navigate(['/user/mesdevis/assurance-sante-internationale/success']);
  }
}
