import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SinistreService } from 'src/app/services/sinistres/sinistre.service';
import { Sinistre } from 'src/app/models/sinistre';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';  // Import du service de notification
import { timer } from 'rxjs';

@Component({
  selector: 'app-sinistre-form',
  templateUrl: './sinistre-form.component.html',
   styleUrls: ['./sinistre-form.component.scss']
})
export class SinistreFormComponent implements OnInit {
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
    private sinistreService: SinistreService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private notificationService: NotificationService  // Injection du service de notification
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
        this.notificationService.showSuccess(
          `Sinistre ${this.isEditing ? 'mis à jour' : 'ajouté'} avec succès !`
        );
  
        // ✅ Affichage d'un message temporaire de confirmation
        alert("Un email de confirmation a été envoyé à mohamedraef.tabarki@esprit.tn");
  
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
    this.notificationService.showError(message);  // Notification d'erreur
  }

  goBack(): void {
    this.location.back();
  }
}
