import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SinistreService } from 'src/app/services/sinistres/sinistre.service';
import { Sinistre } from 'src/app/models/sinistre';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-sinistre-form',
  templateUrl: './sinistre-form.component.html',
  styleUrls: ['./sinistre-form.component.scss']
})
export class SinistreFormComponent implements OnInit {
  getSeverityLabel(value: number | null): string {
    if (value === 1) return 'Légère ou modérée';
    if (value === 2) return 'Grave';
    return 'Non prédite';
  }
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
    telephone: '',
    // ← Nouveaux champs requis
    weatherCondition: '',
    roadSurfaceCondition: '',
    lightCondition: '',
    urbanOrRuralArea: 1,
    accidentSeverity: null
  
  };
  isLoading = false;
  errorMessage: string | null = null;
  isEditing = false;

  constructor(
    private sinistreService: SinistreService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loadSinistre(+id);
    }
  }

  loadSinistre(id: number): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.sinistreService.getSinistreById(id).subscribe({
      next: data => {
        this.sinistre = data;
        this.isLoading = false;
      },
      error: err => this.handleError('Erreur lors du chargement du sinistre.', err)
    });
  }

  saveSinistre(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const req$ = this.isEditing
      ? this.sinistreService.updateSinistre(this.sinistre.id, this.sinistre)
      : this.sinistreService.createSinistre(this.sinistre);

    req$.subscribe({
      next: () => {
        this.notificationService.showSuccess(
          `Sinistre ${this.isEditing ? 'mis à jour' : 'ajouté'} avec succès !`
        );
        alert('Un email de confirmation a été envoyé.');
        timer(1500).subscribe(() => this.router.navigate(['/user/sinistre-list']));
      },
      error: err => this.handleError(
        `Erreur lors de la ${this.isEditing ? 'mise à jour' : 'création'} du sinistre.`, err
      )
    });
  }

  handleError(msg: string, err: any): void {
    console.error(msg, err);
    this.errorMessage = msg;
    this.isLoading = false;
    this.notificationService.showError(msg);
  }

  goBack(): void {
    this.location.back();
  }
}
