import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  currentStep: number = 1;
  selectedPack: string = '';
  specificities: any[] = [];
  displayedColumns: string[] = ['name', 'description'];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.selectedPack = this.route.snapshot.paramMap.get('pack') || '';
    this.loadSpecificities();
  }

  loadSpecificities() {
    // Load specificities and Prime Totale based on the selected pack
    switch (this.selectedPack) {
      case 'pack FELL':
        this.specificities = [
          { name: 'Incendie, Explosion et Foudre', description: '20 000 DT', isTotal: false },
          { name: 'Frais de déblais', description: '1 000 DT', isTotal: false },
          { name: 'Frais de déplacement et de replacement', description: '500 DT', isTotal: false },
          { name: 'Frais d’intervention de secours et sauvetage', description: '1 000 DT', isTotal: false },
          { name: 'Choc d’un véhicule terrestre', description: '10 000 DT', isTotal: false },
          { name: 'Inondation', description: '3 000 DT', isTotal: false },
          { name: 'Dommages électriques et électroniques', description: '2 000 DT', isTotal: false },
          { name: 'Dégâts des Eaux', description: '3 000 DT', isTotal: false },
          { name: 'Frais de recherche des fuites', description: '500 DT', isTotal: false },
          { name: 'Vol : mobiliers et effets personnels', description: '7 000 DT', isTotal: false },
          { name: 'Vol de bijoux, objets précieux', description: '2 000 DT', isTotal: false },
          { name: 'Dommages mobiliers et immobiliers suite au vol', description: '500 DT', isTotal: false },
          { name: 'Bris de glace', description: '500 DT', isTotal: false },
          { name: 'Responsabilité Civile chef de famille', description: '20 000 DT (Dommages matériels)', isTotal: false },
          { name: 'Défense et Recours', description: '1 000 DT', isTotal: false },
          { name: 'Privation de jouissance', description: '2 000 DT', isTotal: false },
          { name: 'Assurances Ordinateur', description: '1 500 DT', isTotal: false },
          { name: 'Prime Totale', description: '80,784 DT', isTotal: true }, // Prime Totale for FELL
        ];
        break;
  
      case 'pack YASMINE':
        this.specificities = [
          { name: 'Incendie, Explosion et Foudre', description: '30 000 DT', isTotal: false },
          { name: 'Frais de déblais', description: '1 000 DT', isTotal: false },
          { name: 'Frais de déplacement et de replacement', description: '500 DT', isTotal: false },
          { name: 'Frais d’intervention de secours et sauvetage', description: '1 000 DT', isTotal: false },
          { name: 'Choc Aéronef', description: '15 000 DT', isTotal: false },
          { name: 'Inondation', description: '6 000 DT', isTotal: false },
          { name: 'Dommages électriques et électroniques', description: '3 000 DT', isTotal: false },
          { name: 'Dégâts des Eaux', description: '5 000 DT', isTotal: false },
          { name: 'Frais de recherche des fuites', description: '700 DT', isTotal: false },
          { name: 'Vol : mobiliers et effets personnels', description: '7 000 DT', isTotal: false },
          { name: 'Vol de bijoux, objets précieux', description: '5 000 DT', isTotal: false },
          { name: 'Dommages mobiliers et immobiliers suite au vol', description: '600 DT', isTotal: false },
          { name: 'Bris de glace', description: '1 000 DT', isTotal: false },
          { name: 'Responsabilité Civile chef de famille', description: '50 000 DT (Dommages matériels)', isTotal: false },
          { name: 'Défense et Recours', description: '1 500 DT', isTotal: false },
          { name: 'Privation de jouissance', description: '3 000 DT', isTotal: false },
          { name: 'Assurances Ordinateur', description: '3 000 DT', isTotal: false },
          { name: 'Prime Totale', description: '115,952 DT', isTotal: true }, // Prime Totale for YASMINE
        ];
        break;
  
      case 'pack AMBAR':
        this.specificities = [
          { name: 'Incendie, Explosion et Foudre', description: '40 000 DT', isTotal: false },
          { name: 'Frais de déblais', description: '1 000 DT', isTotal: false },
          { name: 'Frais de déplacement et de replacement', description: '500 DT', isTotal: false },
          { name: 'Frais d’intervention de secours et sauvetage', description: '1 000 DT', isTotal: false },
          { name: 'Choc d’un véhicule terrestre', description: '20 000 DT', isTotal: false },
          { name: 'Inondation', description: '10 000 DT', isTotal: false },
          { name: 'Dommages électriques et électroniques', description: '5 000 DT', isTotal: false },
          { name: 'Dégâts des Eaux', description: '10 000 DT', isTotal: false },
          { name: 'Frais de recherche des fuites', description: '1 000 DT', isTotal: false },
          { name: 'Vol : mobiliers et effets personnels', description: '20 000 DT', isTotal: false },
          { name: 'Vol de bijoux, objets précieux', description: '8 000 DT', isTotal: false },
          { name: 'Dommages mobiliers et immobiliers suite au vol', description: '800 DT', isTotal: false },
          { name: 'Bris de glace', description: '2 000 DT', isTotal: false },
          { name: 'Responsabilité Civile chef de famille', description: '100 000 DT (Dommages matériels)', isTotal: false },
          { name: 'Défense et Recours', description: '2 000 DT', isTotal: false },
          { name: 'Privation de jouissance', description: '5 000 DT', isTotal: false },
          { name: 'Assurances Ordinateur', description: '5 000 DT', isTotal: false },
          { name: 'Prime Totale', description: '156,328 DT', isTotal: true }, // Prime Totale for AMBAR
        ];
        break;
  
      default:
        this.specificities = [];
        break;
    }
  }

  nextStep() {
    this.currentStep++;
  }

  submitForm() {
    // Handle form submission logic
    console.log('Form submitted for pack:', this.selectedPack);
  }
}