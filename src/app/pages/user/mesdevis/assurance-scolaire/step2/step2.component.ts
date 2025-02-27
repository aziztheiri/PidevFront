import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component {
  numberOfChildren: number = 1;
  effectiveDate: Date | null = null;
  showCards: boolean = false;
  step1Data: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.step1Data = navigation?.extras.state?.['step1Data'];
  }

  previousStep() {
    this.router.navigate(['/user/mesdevis/assurance-scolaire/step1']);
  }

  simulate() {
    if (this.isFormValid()) {
      this.showCards = true;
    }
  }

  nextStep(selectedPack: string) {
    const step2Data = {
      numberOfChildren: this.numberOfChildren,
      effectiveDate: this.effectiveDate,
      selectedPack: selectedPack
    };

    this.router.navigate(['/user/mesdevis/assurance-scolaire/step3'], {
      state: { step1Data: this.step1Data, step2Data }
    });
  }

  isFormValid(): boolean {
    return this.numberOfChildren > 0 && this.effectiveDate !== null;
  }

  calculatePrice(pack: string): number {
    if (pack === 'ecolia') {
      return this.numberOfChildren === 1 ? 31.000 : 53.400;
    } else if (pack === 'ecolia-plus') {
      return this.numberOfChildren === 1 ? 42.200 : 75.800;
    }
    return 0;
  }
}