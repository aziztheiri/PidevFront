import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onSimuler() {
    // Add form validation or logic if needed
    this.router.navigate(['/mesdevis/assurance-voyage/step2av']); // Redirect to Step 2
  }
}