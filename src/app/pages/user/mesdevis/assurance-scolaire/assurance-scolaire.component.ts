import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EcoleService } from '../../../../services/ecole.service';
import { DevisService } from '../../../../services/devis.service';
import { Ecole } from '../../../../models/ecole.model';
import { Devis } from '../../../../models/devis.model';

@Component({
  selector: 'app-assurance-scolaire',
  templateUrl: './assurance-scolaire.component.html',
  styleUrls: ['./assurance-scolaire.component.scss']
})
export class AssuranceScolaireComponent {
  // Step Management
  currentStep: number = 1;

  // Step 1 Data
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
  secteurActivite: string = '';
  profession: string = '';
  activiteEtablissement: string = '';
  adresseEtablissement: string = '';
  villeEtablissement: string = '';
  codePostaleEtablissement: string = '';

  // Step 2 Data
  numberOfChildren: number = 1;
  effectiveDate: Date | null = null;
  showCards: boolean = false;
  children: { lastName: string, firstName: string, birthDate: Date | null }[] = [];
  selectedPack: string = ''; // Store the selected pack

  // Step 3 Data
  adresseParent: string = '';
  ville: string = '';
  codePostale: string = '';
  dateEffet: Date | null = null;

  constructor(
    private router: Router,
    private ecoleService: EcoleService,
    private devisService: DevisService
  ) {
    this.onNumberOfChildrenChange(); // Initialize children array
  }

  // Step Navigation
  nextStep(selectedPack?: string) {
    if (this.currentStep === 1 && this.isStep1Valid()) {
      this.currentStep = 2;
    } else if (this.currentStep === 2 && this.isStep2Valid()) {
      if (selectedPack) {
        this.selectedPack = selectedPack; // Store the selected pack
        this.currentStep = 3;
      } else {
        this.showCards = true;
      }
    } else if (this.currentStep === 3 && this.isStep3Valid()) {
      this.validate();
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.showCards = false;
    }
  }

  // Step Validation
  isStep1Valid(): boolean {
    return this.termsAccepted && (
      (this.selectedType === 'female' || this.selectedType === 'male') ?
      !!this.idType && !!this.idNumber && !!this.lastName && !!this.firstName && !!this.phoneNumber && !!this.email :
      !!this.fiscalId && !!this.companyName && !!this.phoneNumber && !!this.email
    );
  }

  isStep2Valid(): boolean {
    const areChildrenValid = this.children.every(child =>
      child.lastName && child.firstName && child.birthDate
    );
    return this.numberOfChildren > 0 && this.effectiveDate !== null && areChildrenValid;
  }

  isStep3Valid(): boolean {
    return !!this.adresseParent && !!this.ville && !!this.codePostale && !!this.dateEffet;
  }

  // Child Management
  onNumberOfChildrenChange() {
    this.children = [];
    for (let i = 0; i < this.numberOfChildren; i++) {
      this.children.push({ lastName: '', firstName: '', birthDate: null });
    }
  }

  // Price Calculation
  calculateMontant(selectedPack: string): number {
    if (selectedPack === 'ecolia') {
      return this.numberOfChildren === 1 ? 31.0 : 53.4;
    } else if (selectedPack === 'ecolia-plus') {
      return this.numberOfChildren === 1 ? 42.2 : 75.8;
    }
    return 0;
  }

  // Final Validation
  validate() {
    const ecole: Ecole = {
      role: this.selectedType,
      typePiece: this.selectedType === 'etablissement' ? null : this.idType, // Null for Établissement
      numeroPiece: this.selectedType === 'etablissement' ? null : this.idNumber, // Null for Établissement
      nom: this.selectedType === 'etablissement' ? null : this.lastName, // Null for Établissement
      prenom: this.selectedType === 'etablissement' ? null : this.firstName, // Null for Établissement
      numTelephone: this.phoneNumber,
      email: this.email,
      matriculeFiscale: this.selectedType === 'etablissement' ? this.fiscalId : null, // Null for Tuteur/Parent
      raisonSociale: this.selectedType === 'etablissement' ? this.companyName : null, // Null for Tuteur/Parent
      secteurActivite: this.selectedType === 'etablissement' ? this.secteurActivite : null, // Null for Tuteur/Parent
      profession: this.selectedType === 'etablissement' ? this.profession : null, // Null for Tuteur/Parent
      activiteEtablissement: this.selectedType === 'etablissement' ? this.activiteEtablissement : null, // Null for Tuteur/Parent
      adresseEtablissement: this.selectedType === 'etablissement' ? this.adresseEtablissement : null, // Null for Tuteur/Parent
      villeEtablissement: this.selectedType === 'etablissement' ? this.villeEtablissement : null, // Null for Tuteur/Parent
      codePostaleEtablissement: this.selectedType === 'etablissement' ? this.codePostaleEtablissement : null, // Null for Tuteur/Parent
      nomsEnfants: this.children.map(child => child.lastName),
      prenomsEnfants: this.children.map(child => child.firstName),
      datesNaissanceEnfants: this.children.map(child => child.birthDate).filter((date): date is Date => date !== null), // Filter out null values
      dateEffet: this.dateEffet!,
      pack: this.selectedPack, // Add the selected pack
      adresseParent: this.adresseParent,
      ville: this.ville,
      codePostale: this.codePostale,
      dateDebutContrat: new Date(),
      dateFinContrat: new Date(),
    };

    // Save Ecole data
    this.saveEcole(ecole);
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
      cin: '11111111', // Set a default value or retrieve from the form
      montant: this.calculateMontant(this.selectedPack), // Use the stored selected pack
      dateCalcul: new Date(), // Current date
      typeAssurance: 'ECOLE', // Hardcoded value matching the Spring enum
      idAssurance: ecoleId, // Use the ID of the saved Ecole
      statut: 'EN_COURS', // Hardcoded value matching the Spring enum
      dateDebutContrat: new Date(), // Set a default value or calculate based on your logic
      dateFinContrat: new Date(), // Set a default value or calculate based on your logic
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

  // Add the selectType method
  selectType(type: 'female' | 'male' | 'etablissement') {
    this.selectedType = type;
  }

  // Add the simulate method
  simulate() {
    if (this.isStep2Valid()) {
      this.showCards = true;
    }
  }
}