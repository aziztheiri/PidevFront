import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component {
  constructor(private router: Router) {}

  previousStep() {
    this.router.navigate(['/user/mesdevis/assurance-scolaire/step2']);
  }

  validate() {
    // Add validation logic here (e.g., API call, form submission)
    alert('Validation successful!');
    this.router.navigate(['/user/consulter-devis']);
  }
}