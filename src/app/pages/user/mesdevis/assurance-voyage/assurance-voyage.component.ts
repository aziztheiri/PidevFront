import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { VoyageService } from '../../../../services/voyage.service'; // Import VoyageService
import { DevisService } from '../../../../services/devis.service'; // Import DevisService
import { Voyage } from '../../../../models/voyage.model'; // Import Voyage model
import { Devis } from '../../../../models/devis.model'; // Import Devis model

@Component({
  selector: 'app-assurance-voyage',
  templateUrl: './assurance-voyage.component.html',
  styleUrls: ['./assurance-voyage.component.scss']
})
export class AssuranceVoyageComponent {
  constructor(
    private router: Router,
    private voyageService: VoyageService,
    private devisService: DevisService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Current URL:', event.url);
      }
    });
  }

  // Collect data from all steps and save Voyage and Devis
  saveVoyageAndDevis(step1Data: any, step2Data: any, step3Data: any) {
    const voyageData: Voyage = {
      dureeContrat: step1Data.dureeContrat,
      dateDepart: step1Data.dateDepart,
      dateRetour: step1Data.dateRetour,
      pays: step1Data.paysDestination,
      nationalite: step1Data.nationalite,
      trancheAge: step1Data.ageTranche,
      dateDebutContrat: step1Data.dateDepart, // Assuming dateDebutContrat is the same as dateDepart
      dateFinContrat: step1Data.dateRetour // Assuming dateFinContrat is the same as dateRetour
    };

    this.voyageService.createVoyage(voyageData).subscribe(
      (voyageResponse) => {
        console.log('Voyage saved:', voyageResponse);

        if (voyageResponse.id !== undefined) {
          this.saveDevis(voyageResponse.id, step2Data, step3Data);
        } else {
          console.error('Error: Voyage ID is undefined');
          alert('Une erreur s\'est produite lors de la création du devis.');
        }
      },
      (error) => {
        console.error('Error saving Voyage:', error);
      }
    );
  }

  // Save Devis data
  saveDevis(voyageId: number, step2Data: any, step3Data: any): void {
    const devis: Devis = {
      montant: step2Data.primeTotale, // Assuming primeTotale is available in step2Data
      dateCalcul: new Date(), // Current date
      typeAssurance: 'VOYAGE', // Hardcoded value matching the Spring enum
      idAssurance: voyageId, // Use the ID of the saved Voyage
      statut: 'EN_COURS', // Hardcoded value matching the Spring enum
      dateDebutContrat: step3Data.dateDepart, // Assuming dateDebutContrat is the same as dateDepart
      dateFinContrat: step3Data.dateRetour // Assuming dateFinContrat is the same as dateRetour
    };

    this.devisService.createDevis(devis).subscribe(
      (response) => {
        console.log('Devis saved:', response);
        alert('Votre devis a été envoyé par email.'); // Show success message
        this.router.navigate(['/user/consulter-devis']);
      },
      (error) => {
        console.error('Error saving Devis:', error);
      }
    );
  }
}