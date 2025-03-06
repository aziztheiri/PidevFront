import { Component, OnInit } from '@angular/core';
import { SinistreService } from 'src/app/services/sinistres/sinistre.service';
import { Sinistre } from 'src/app/models/sinistre';

@Component({
  selector: 'app-sinistre-list',
  templateUrl: './sinistre-list.component.html',
  //styleUrls: ['./sinistre-list.component.css']
})
export class SinistreListComponent implements OnInit {
  sinistres: Sinistre[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private sinistreService: SinistreService) {}

  ngOnInit(): void {
    this.loadSinistres();
  }

  loadSinistres(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.sinistreService.getSinistres().subscribe(
      (data: Sinistre[]) => {
        this.sinistres = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des sinistres. Veuillez réessayer plus tard.';
        this.isLoading = false;
        console.error('Erreur lors du chargement des sinistres:', error);
      }
    );
  }

  deleteSinistre(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce sinistre ?')) {
      this.sinistreService.deleteSinistre(id).subscribe(
        () => {
          this.sinistres = this.sinistres.filter(s => s.id !== id);
        },
        (error) => {
          this.errorMessage = 'Erreur lors de la suppression du sinistre. Veuillez réessayer plus tard.';
          console.error('Erreur lors de la suppression du sinistre:', error);
        }
      );
    }
  }
}
