import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.scss']
})
export class SuccessMessageComponent {
  constructor(private router: Router) {}

  redirectToDevis() {
    this.router.navigate(['/user/consulter-devis']);
  }
}
