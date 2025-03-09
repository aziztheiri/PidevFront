import { Component, OnInit } from '@angular/core';
import { AccidentsService } from '../../../../services/accidents.service';
import { DevisService } from '../../../../services/devis.service';
import { Accidents } from '../../../../models/accidents.model';
import { Devis } from '../../../../models/devis.model';
import { Router } from '@angular/router';



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
  "AGENT DE CHANGE",
  "AGENT DE PAIX",
  "ARCHITECTE (avec dépl. inf. à 20.00 Kms)",
  "ARCHITECTE (avec dépl. sup. à 20.000 Kms)",
  "ARTISTE - PEINTRE",
  "ASSISTANTE SOCIALE",
  "AVOCAT",
  "BIJOUTIER",
  "BOUCHER",
  "BOULANGER",
  "BROCANTEUR",
  "CAFETIER",
  "CAISSIER de MAGASIN",
  "CARRELEUR",
  "CHARPENTIER",
  "CHAUFFEUR - LIVREUR",
  "CHAUFFEUR de TAXI",
  "CHEF D'ATELIER (avec utilisation d'outils dangereux)",
  "CHEF D'ATELIER (sans emploi d'outils dangereux)",
  "CHIRURGIEN",
  "COIFFEUR",
  "COMPTABLE",
  "CONDUCTEUR D'AUTOBUS",
  "CONDUCTEUR de TRAVAUX",
  "CONFISEUR",
  "COUVREUR",
  "CREMIER",
  "CUISINIERE",
  "DACTYLO",
  "DELEGUE MEDICAL",
  "DIPLOMATE",
  "DOCKER",
  "EBENISTE",
  "ELECTRICIEN",
  "EMPLOYE de BUREAU",
  "ENTRAITEUR FOOT",
  "EPICIER (commerce de détail)",
  "ETUDIANT (déplacement à l'étranger)",
  "FACTEUR",
  "FORGERON",
  "FOURREUR",
  "FRAISEUR",
  "GARAGISTE",
  "GARÇON de CAFE",
  "IMPRIMEUR",
  "INDUSTRIEL (avec travail manuel, sans emploi d'outils dangereux)",
  "INDUSTRIEL (avec utilisation d'outils dangereux)",
  "INDUSTRIEL (sans travail manuel)",
  "INFIRMIERE",
  "INGENIEUR AVEC PARTICIPATION AUX TRAVAUX (avec emploi d'outils dangereux)",
  "INGENIEUR AVEC PARTICIPATION AUX TRAVAUX (sans emploi d'outils dangereux)",
  "INGENIEUR D'ETUDE",
  "INSPECTEUR D'ASSURANCE",
  "INSTITUTEUR",
  "JOUEUR DE FOOT",
  "KINESITHERAPEUTE",
  "LIBRAIRE",
  "MAÇON",
  "MAGASINIER",
  "MAGISTRAT",
  "MANUTENTIONNAIRE (sans manipulation habituelle de marchandises dangereuses)",
  "MANUTENTIONNAIRE AVEC MANIPULATION HABITUELLE DE MARCHANDISES DANGEREUSES",
  "MECANICIEN",
  "MEDECIN",
  "MENUISIER",
  "MILITAIRE",
  "MODISTE",
  "NOTAIRE",
  "OUVREUSE DE CINEMA",
  "OUVRIER D'USINE (de l'industrie Lourde)",
  "OUVRIER D'USINE (de l'industrie légére)",
  "PATISSIER",
  "PEINTRE EN BATIMENT",
  "PERSONNEL NAVIGANT de L'AVIATION CIVILE",
  "PILOTE",
  "PLOMBIER - ZINGUEUR",
  "PLOMBIER",
  "POMPIER",
  "PRESTIDIGITATEUR",
  "RESTAURATEUR",
  "SOUDEUR",
  "TECHNICIEN D'INSTALLATION D'ANTENNES",
  "TERRASSIER",
  "VENDEUSE",
  "VITRIER",
  "VOYAGEUR DE COMMERCE",
  "ELEVE EN EXCURSION"
];

  constructor(
    private accidentsService: AccidentsService,
    private devisService: DevisService,
    private router: Router
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
      cin: '11111111',
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
        this.router.navigate(['/user/consulter-devis']);
      },
      (error) => {
        console.error('Error saving Devis:', error);
      }
    );
  }
}