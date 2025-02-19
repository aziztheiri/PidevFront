import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component {
  numberOfChildren: number = 1; // Default to 1 child
  effectiveDate: Date | null = null; // Effective date
  showCards: boolean = false; // Controls card visibility

  constructor(private router: Router) {}

  // Navigate back to Step 1
  previousStep() {
    this.router.navigate(['/user/mesdevis/assurance-scolaire/step1']);
  }

  // Show cards when Simuler is clicked
  simulate() {
    if (this.isFormValid()) {
      this.showCards = true;
    }
  }

  // Navigate to Step 3
  nextStep() {
    this.router.navigate(['/user/mesdevis/assurance-scolaire/step3']);
  }

  // Check if the form is valid
  isFormValid(): boolean {
    return this.numberOfChildren > 0 && this.effectiveDate !== null;
  }

  // Calculate price based on formula and number of children
  calculatePrice(formula: 'ecolia' | 'ecolia-plus'): number {
    if (formula === 'ecolia') {
      return this.numberOfChildren === 1 ? 31.000 : 53.400;
    } else if (formula === 'ecolia-plus') {
      return this.numberOfChildren === 1 ? 42.200 : 75.800;
    }
    return 0;
  }
}