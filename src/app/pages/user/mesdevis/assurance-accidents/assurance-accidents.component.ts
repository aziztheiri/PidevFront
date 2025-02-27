import { Component, OnInit } from '@angular/core';
import { AccidentsService } from '../../../../services/accidents.service';
import { DevisService } from '../../../../services/devis.service';
import { Accidents } from '../../../../models/accidents.model';
import { Devis } from '../../../../models/devis.model';

@Component({
  selector: 'app-assurance-accidents',
  templateUrl: './assurance-accidents.component.html',
  styleUrls: ['./assurance-accidents.component.scss'],
})
export class AssuranceAccidentsComponent implements OnInit {
  formSubmitted: boolean = false; // Track if the first form is submitted
  dureeFranchise: string = 'Aucune'; // Initialize the default value for Durée de Franchise
  fraisTraitement: string = 'Pas de Garantie'; // Initialize the default value for Frais de Traitement

  // Form data model
  accidentsData: any = {
    profession: '',
    capitalDeces: 0,
    capitalIPP: 0,
    montantRenteParJourDT: 0,
    dureeFranchise: this.dureeFranchise,
    capitalTraitement: this.fraisTraitement,
    nom: '',
    prenom: '',
    mail: '',
    confirmEmail: '',
    telephone: '',
    conditions: false,
  };

  // Full list of professions
  professions: string[] = [
    "ADMINISTRATEUR DE SOCIETE",
    "AGENT D'ASSURANCES",
    // Add other professions here...
  ];

  constructor(
    private accidentsService: AccidentsService,
    private devisService: DevisService
  ) {}

  ngOnInit(): void {
    // Set default values
    this.dureeFranchise = 'Aucune';
    this.fraisTraitement = 'Pas de Garantie';
  }

  // Handle form submission
  onSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission
    this.formSubmitted = true; // Show the email form
  }

  // Handle "Obtenir Devis" button click
  obtenirDevis() {
    // Use the bound data directly
    const accidents: Accidents = {
      profession: this.accidentsData.profession,
      capitalDeces: +this.accidentsData.capitalDeces,
      capitalIPP: +this.accidentsData.capitalIPP,
      montantRenteParJourDT: +this.accidentsData.montantRenteParJourDT,
      dureeFranchise: this.accidentsData.dureeFranchise,
      capitalTraitement: +this.accidentsData.capitalTraitement,
      nom: this.accidentsData.nom,
      prenom: this.accidentsData.prenom,
      mail: this.accidentsData.mail,
      telephone: this.accidentsData.telephone,
    };

    // Save Accidents data
    this.saveAccidents(accidents);
  }

  saveAccidents(accidents: Accidents): void {
    this.accidentsService.addAccidents(accidents).subscribe(
      (response) => {
        console.log('Accidents saved:', response);

        if (response.id !== undefined) {
          this.saveDevis(response.id);
        } else {
          console.error('Error: Accidents ID is undefined');
          alert('Une erreur s\'est produite lors de la création du devis.');
        }
      },
      (error) => {
        console.error('Error saving Accidents:', error);
      }
    );
  }

  // Save Devis data
  saveDevis(accidentsId: number): void {
    const devis: Devis = {
      montant: 0, // Set a default value or calculate based on your logic
      dateCalcul: new Date(), // Current date
      typeAssurance: 'ACCIDENTS', // Hardcoded value matching the Spring enum
      idAssurance: accidentsId, // Use the ID of the saved Accidents
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