import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssuranceVoyageComponent } from '../assurance-voyage.component'; // Import AssuranceVoyageComponent

@Component({
  selector: 'app-step1av',
  templateUrl: './step1av.component.html',
  styleUrls: ['./step1av.component.scss']
})
export class Step1avComponent {
  dureeContrat: string = '';
  dateDepart: Date | null = null;
  dateRetour: Date | null = null;
  paysDestination: string = '';
  nationalite: string = '';
  ageTranche: string = '';

  paysList: string[] = [
    'France', 'Allemagne', 'Italie', 'Espagne', 'États-Unis', 'Canada', // Add your list of countries excluding Tunisia
  ];

  constructor(private router: Router, private assuranceVoyageComponent: AssuranceVoyageComponent) {}

  onSimuler() {
    const step1Data = {
      dureeContrat: this.dureeContrat,
      dateDepart: this.dateDepart,
      dateRetour: this.dateRetour,
      paysDestination: this.paysDestination,
      nationalite: this.nationalite,
      ageTranche: this.ageTranche
    };

    // Navigate to Step 2
    this.router.navigate(['/user/mesdevis/assurance-voyage/step2'], { state: { step1Data } });
  }
}