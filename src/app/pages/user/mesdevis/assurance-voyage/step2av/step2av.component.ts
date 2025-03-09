import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssuranceVoyageComponent } from '../assurance-voyage.component'; // Import AssuranceVoyageComponent

@Component({
  selector: 'app-step2av',
  templateUrl: './step2av.component.html',
  styleUrls: ['./step2av.component.scss']
})
export class Step2avComponent {
  step1Data: any;
  primeTotale: number = 45.65; // Assuming this is the total prime

  constructor(private router: Router, private assuranceVoyageComponent: AssuranceVoyageComponent) {
    const navigation = this.router.getCurrentNavigation();
    this.step1Data = navigation?.extras.state?.['step1Data'];
  }

  previousStep() {
    this.router.navigate(['/user/mesdevis/assurance-voyage/step1']);
  }

  nextStep() {
    const step2Data = {
      primeTotale: this.primeTotale
    };

    // Navigate to Step 3
    this.router.navigate(['/user/mesdevis/assurance-voyage/step3'], { state: { step1Data: this.step1Data, step2Data } });
  }
}