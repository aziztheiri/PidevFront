import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-assurance-scolaire',
  templateUrl: './assurance-scolaire.component.html',
  styleUrls: ['./assurance-scolaire.component.scss']
})
export class AssuranceScolaireComponent {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Current URL:', event.url);
      }
    });
  }
}