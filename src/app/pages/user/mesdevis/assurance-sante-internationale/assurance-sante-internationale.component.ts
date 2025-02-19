import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assurance-sante-internationale',
  templateUrl: './assurance-sante-internationale.component.html',
  styleUrls: ['./assurance-sante-internationale.component.scss'],
})
export class AssuranceSanteInternationaleComponent {

  constructor(private router: Router) {}
  redirectToSucess(){
    console.log('Form submitted!');
    this.router.navigate(['/user/mesdevis/assurance-sante-internationale/success']);
  }
}