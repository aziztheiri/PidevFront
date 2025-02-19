import { Component } from '@angular/core';

@Component({
  selector: 'app-step2av',
  templateUrl: './step2av.component.html',
  styleUrls: ['./step2av.component.scss']
})
export class Step2avComponent {
  
  previousStep() {
    // Logic to redirect to step 1
    console.log('Redirecting to step 1');
  }

  nextStep() {
    // Logic to redirect to step 3
    console.log('Redirecting to step 3');
  }
}
