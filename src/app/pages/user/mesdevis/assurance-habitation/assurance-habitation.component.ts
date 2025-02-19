import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assurance-habitation',
  templateUrl: './assurance-habitation.component.html',
  styleUrls: ['./assurance-habitation.component.scss'],
})
export class AssuranceHabitationComponent {
  constructor(private router: Router) {}

  selectPack(pack: string) {
    // Store the selected pack in a service or local storage if needed
    // Redirect to the first step of the form
    this.router.navigate(['/user/mesdevis/assurance-habitation/form', pack]);
  }
}