import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-assurance-voyage',
  templateUrl: './assurance-voyage.component.html',
  styleUrls: ['./assurance-voyage.component.scss']
})
export class AssuranceVoyageComponent {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Current URL:', event.url);
      }
    });
  }
}
