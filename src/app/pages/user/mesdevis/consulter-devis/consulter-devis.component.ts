import { Component } from '@angular/core';

export interface Devis {
  type: string;
  reference: string;
  date: string;
  total: string;
  statut: string;
}

@Component({
  selector: 'app-consulter-devis',
  templateUrl: './consulter-devis.component.html',
  styleUrls: ['./consulter-devis.component.scss'],
})
export class ConsulterDevisComponent {
  displayedColumns: string[] = ['type', 'reference', 'date', 'total', 'statut'];
  dataSource: Devis[] = [
    { type: 'Voyage', reference: 'DEV123', date: '2023-10-01', total: '€500.00', statut: 'En attente' },
    { type: 'Habitation', reference: 'DEV124', date: '2023-10-02', total: '€700.00', statut: 'Approuvé' },
    // Add more data as needed
  ];

  scrollLeft() {
    const scrollableDiv = document.querySelector('.scrollable-buttons');
    scrollableDiv?.scrollBy({ left: -100, behavior: 'smooth' });
  }

  scrollRight() {
    const scrollableDiv = document.querySelector('.scrollable-buttons');
    scrollableDiv?.scrollBy({ left: 100, behavior: 'smooth' });
  }
}