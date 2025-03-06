import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SinistreService } from 'src/app/services/sinistres/sinistre.service';
import { Sinistre } from 'src/app/models/sinistre';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sinistre-form',
  templateUrl: './sinistre-form.component.html',
})
export class SinistreFormComponent implements OnInit {
  sinistre: Sinistre = {
    id: 0,
    dateDeclaration: new Date(), // This is a Date object now
    description: '',
    statut: '',
    montantEstime: 0,
    lieu: '',
    typeSinistre: '',
    responsabilite: '',
    dateCloture: null,
  };
  isLoading: boolean = false;
  errorMessage: string | null = null;
  isEditing: boolean = false;

  constructor(
    private sinistreService: SinistreService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loadSinistre(id);
    }
  }

  loadSinistre(id: string): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.sinistreService.getSinistreById(+id).subscribe(
      (data: Sinistre) => {
        this.sinistre = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement du sinistre. Veuillez réessayer plus tard.';
        this.isLoading = false;
        console.error('Erreur lors du chargement du sinistre:', error);
      }
    );
  }

  saveSinistre(): void {
    this.isLoading = true;
    this.errorMessage = null;
    if (this.isEditing) {
      this.sinistreService.updateSinistre(this.sinistre.id, this.sinistre).subscribe(
        (data) => {
          this.router.navigate(['/sinistre-list']);
        },
        (error) => {
          this.errorMessage = 'Erreur lors de la mise à jour du sinistre. Veuillez réessayer plus tard.';
          this.isLoading = false;
          console.error('Erreur lors de la mise à jour du sinistre:', error);
        }
      );
    } else {
      this.sinistreService.createSinistre(this.sinistre).subscribe(
        (data) => {
          this.router.navigate(['/sinistre-list']);
        },
        (error) => {
          this.errorMessage = 'Erreur lors de la création du sinistre. Veuillez réessayer plus tard.';
          this.isLoading = false;
          console.error('Erreur lors de la création du sinistre:', error);
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }
}
