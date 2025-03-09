import { Component, OnInit } from '@angular/core';
import { PrevoyanceService } from '../../../../services/prevoyance.service';
import { DevisService } from '../../../../services/devis.service';
import { Prevoyance } from '../../../../models/prevoyance.model';
import { Devis } from '../../../../models/devis.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-assurance-prevoyance',
  templateUrl: './assurance-prevoyance.component.html',
  styleUrls: ['./assurance-prevoyance.component.scss'],
})
export class AssurancePrevoyanceComponent implements OnInit {
  formSubmitted: boolean = false; // Track if the first form is submitted
  decesAccidentel: boolean = false; // Track if "Décès accidentel" is checked
  decesAccidentelMontant: number = 0; // Track the value of "Décès accidentel"
  invaliditePartielle: boolean = false; // Track if "Invalidité partielle" is checked
  invaliditePPMontant: number = 0; // Track the value of "Invalidité partielle"
  incapaciteTemporaire: boolean = false; // Track if "Incapacité temporaire" is checked
  franchise: string = ''; // Track the value of "Franchise"
  conditionsAccepted: boolean = false; // Track if conditions are accepted
  confirmEmail: string = '';

  // Form data model
  prevoyanceData: Prevoyance = {
    dateEffet: new Date(),
    dateNaissance: new Date(),
    duree: 0,
    frequenceReglement: '',
    capitalDeces: 0,
    decesAccidentel: null,
    invaliditePP: null,
    incapaciteTemp: false,
    franchise: '',
    nom: '',
    prenom: '',
    mail: '',
    telephone: '',
  };

  constructor(
    private prevoyanceService: PrevoyanceService,
    private devisService: DevisService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Handle form submission
  onSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission
    this.formSubmitted = true; // Show the email form
  }

  // Handle "Décès accidentel" checkbox change
  onDecesAccidentelChange() {
    if (!this.decesAccidentel) {
      this.decesAccidentelMontant = 0; // Reset "Décès accidentel" value if unchecked
      this.invaliditePartielle = false; // Reset "Invalidité partielle" if unchecked
      this.invaliditePPMontant = 0; // Reset "Invalidité partielle" amount
      this.incapaciteTemporaire = false; // Reset "Incapacité temporaire" if unchecked
    }
  }

  // Handle "Invalidité partielle" checkbox change
  onInvaliditePartielleChange() {
    if (!this.invaliditePartielle) {
      this.invaliditePPMontant = 0; // Reset "Invalidité partielle" amount
      this.incapaciteTemporaire = false; // Reset "Incapacité temporaire" if unchecked
    }
  }

  // Handle "Obtenir Devis" button click
  obtenirDevis() {
    if (this.prevoyanceData.mail !== this.confirmEmail) {
      alert('Les adresses email ne correspondent pas.'); // Show an error if emails don't match
      return;
    }

    if (this.conditionsAccepted) {
      const prevoyance: Prevoyance = {
        dateEffet: this.prevoyanceData.dateEffet,
        dateNaissance: this.prevoyanceData.dateNaissance,
        duree: this.prevoyanceData.duree,
        frequenceReglement: this.prevoyanceData.frequenceReglement,
        capitalDeces: this.prevoyanceData.capitalDeces,
        decesAccidentel: this.decesAccidentel ? this.decesAccidentelMontant : null,
        invaliditePP: this.invaliditePartielle ? this.invaliditePPMontant : null,
        incapaciteTemp: this.incapaciteTemporaire,
        franchise: this.franchise,
        nom: this.prevoyanceData.nom,
        prenom: this.prevoyanceData.prenom,
        mail: this.prevoyanceData.mail,
        telephone: this.prevoyanceData.telephone,
      };

      this.savePrevoyance(prevoyance);
    } else {
      alert('Veuillez accepter les conditions pour continuer.');
    }
  }

  // Save Prevoyance data
  savePrevoyance(prevoyance: Prevoyance): void {
    this.prevoyanceService.createPrevoyance(prevoyance).subscribe(
      (response) => {
        console.log('Prevoyance saved:', response);

        if (response.id !== undefined) {
          this.saveDevis(response.id); // Save Devis with the Prevoyance ID
        } else {
          console.error('Error: Prevoyance ID is undefined');
          alert('Une erreur s\'est produite lors de la création du devis.');
        }
      },
      (error) => {
        console.error('Error saving Prevoyance:', error);
      }
    );
  }

  // Save Devis data
  saveDevis(prevoyanceId: number): void {
    const devis: Devis = {
      montant: 0, // Set a default value or calculate based on your logic
      dateCalcul: new Date(), // Current date
      typeAssurance: 'PREVOYANCE', // Hardcoded value matching the Spring enum
      idAssurance: prevoyanceId, // Use the ID of the saved Prevoyance
      statut: 'EN_COURS', // Hardcoded value matching the Spring enum
      dateDebutContrat: new Date(), // Set a default value or calculate based on your logic
      dateFinContrat: new Date(), // Set a default value or calculate based on your logic
    };

    this.devisService.createDevis(devis).subscribe(
      (response) => {
        console.log('Devis saved:', response);
        alert('Votre devis a été envoyé par email.');
        this.router.navigate(['/user/consulter-devis']);// Show success message
      },
      (error) => {
        console.error('Error saving Devis:', error);
      }
    );
  }
}