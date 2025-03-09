import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcoleService } from '../../../../../services/ecole.service';
import { DevisService } from '../../../../../services/devis.service';
import { Ecole } from '../../../../../models/ecole.model';
import { Devis } from '../../../../../models/devis.model';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
})
export class Step3Component implements OnInit {
  // Form fields
  adresseParent: string = '';
  ville: string = '';
  codePostale: string = '';
  dateEffet: Date | null = null;

  // Data from previous steps
  step1Data: any;
  step2Data: any;

  constructor(
    private router: Router,
    private ecoleService: EcoleService,
    private devisService: DevisService
  ) {
    // Retrieve data from previous steps
    const navigation = this.router.getCurrentNavigation();
    this.step1Data = navigation?.extras.state?.['step1Data'];
    this.step2Data = navigation?.extras.state?.['step2Data'];
  }

  ngOnInit(): void {}

  // Navigate back to Step 2
  previousStep() {
    this.router.navigate(['/user/mesdevis/assurance-scolaire/step2'], {
      state: { step1Data: this.step1Data },
    });
  }

  // Validate the form and save data
  validate() {
    if (this.isFormValid()) {
      // Create Ecole object
      const ecole: Ecole = {
        role: this.step1Data.role,
        typePiece: this.step1Data.typePiece,
        numeroPiece: this.step1Data.numeroPiece,
        nom: this.step1Data.nom,
        prenom: this.step1Data.prenom,
        numTelephone: this.step1Data.numTelephone,
        email: this.step1Data.email,
        matriculeFiscale: this.step1Data.matriculeFiscale,
        raisonSociale: this.step1Data.raisonSociale,
        secteurActivite: this.step1Data.secteurActivite,
        profession: this.step1Data.profession,
        activiteEtablissement: this.step1Data.activiteEtablissement,
        adresseEtablissement: this.step1Data.adresseEtablissement,
        villeEtablissement: this.step1Data.villeEtablissement,
        codePostaleEtablissement: this.step1Data.codePostaleEtablissement,
        nomsEnfants: this.step2Data.children.map((child: any) => child.lastName),
        prenomsEnfants: this.step2Data.children.map((child: any) => child.firstName),
        datesNaissanceEnfants: this.step2Data.children.map((child: any) => child.birthDate),
        dateEffet: this.dateEffet!,
        pack: this.step2Data.selectedPack,
        adresseParent: this.adresseParent,
        ville: this.ville,
        codePostale: this.codePostale,
        dateDebutContrat: new Date(), // Set a default value or calculate based on your logic
        dateFinContrat: new Date(), // Set a default value or calculate based on your logic
      };

      // Save Ecole data
      this.saveEcole(ecole);
    }
  }

  // Save Ecole data
  saveEcole(ecole: Ecole): void {
    this.ecoleService.createEcole(ecole).subscribe(
      (response) => {
        console.log('Ecole saved:', response);

        if (response.id !== undefined) {
          this.saveDevis(response.id);
        } else {
          console.error('Error: Ecole ID is undefined');
          alert('Une erreur s\'est produite lors de la création du devis.');
        }
      },
      (error) => {
        console.error('Error saving Ecole:', error);
      }
    );
  }

  // Save Devis data
  saveDevis(ecoleId: number): void {
    const devis: Devis = {
      montant: this.calculateMontant(), // Calculate based on the selected pack
      dateCalcul: new Date(), // Current date
      typeAssurance: 'SCOLAIRE', // Hardcoded value matching the Spring enum
      idAssurance: ecoleId, // Use the ID of the saved Ecole
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

  // Calculate the montant based on the selected pack
  calculateMontant(): number {
    if (this.step2Data.selectedPack === 'ecolia') {
      return this.step2Data.numberOfChildren === 1 ? 31.0 : 53.4;
    } else if (this.step2Data.selectedPack === 'ecolia-plus') {
      return this.step2Data.numberOfChildren === 1 ? 42.2 : 75.8;
    }
    return 0;
  }

  // Check if the form is valid
  isFormValid(): boolean {
    return (
      this.adresseParent !== '' &&
      this.ville !== '' &&
      this.codePostale !== '' &&
      this.dateEffet !== null
    );
  }
}