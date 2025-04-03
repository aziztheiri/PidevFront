import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sinistre } from 'src/app/models/sinistre';
import { NotificationService } from 'src/app/services/notification.service';
import { SinistresService } from 'src/app/services/sinistres.service';
import { timer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sinistre-form',
  templateUrl: './sinistre-form.component.html',
  styleUrls: ['./sinistre-form.component.scss']
})
export class SinistreFormComponent {
  sinistre: Sinistre = {
    id: 0,
    dateDeclaration: new Date(),
    description: '',
    statut: '',
    montantEstime: 0,
    lieu: '',
    typeSinistre: '',
    responsabilite: '',
    dateCloture: null,
     telephone: ''
  };
  isLoading: boolean = false;
  errorMessage: string | null = null;
  isEditing: boolean = false;

  constructor(
    private sinistreService: SinistresService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
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
    this.sinistreService.getSinistreById(+id).subscribe({
      next: (data: Sinistre) => {
        this.sinistre = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.handleError('Erreur lors du chargement du sinistre.', error);
      }
    });
  }

  saveSinistre(): void {
    this.isLoading = true;
    this.errorMessage = null;
  
    const request = this.isEditing
      ? this.sinistreService.updateSinistre(this.sinistre.id, this.sinistre)
      : this.sinistreService.createSinistre(this.sinistre);
  
    request.subscribe({
      next: () => {
     
  
        // ✅ Affichage d'un message temporaire de confirmation
        alert("Un email de confirmation a été envoyé ");
  
        timer(1500).subscribe(() => {
          this.router.navigate(['/user/sinistre-list']);
        });
      },
      error: (error) => {
        this.handleError(
          `Erreur lors de la ${this.isEditing ? 'mise à jour' : 'création'} du sinistre.`,
          error
        );
      }
    });
  
  }
  

  handleError(message: string, error: any): void {
    console.error(message, error);
    this.errorMessage = message;
    this.isLoading = false;
  }

  goBack(): void {
    this.location.back();
  }
}
