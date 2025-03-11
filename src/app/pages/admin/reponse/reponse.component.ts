import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ReponseDialogComponent } from '../reponse-dialog/reponse-dialog.component';
import { ReponseService } from 'src/app/services/reponse.service';
import { DescriptionModalComponent } from '../../user/description-modal/description-modal.component';

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.scss']
})
export class ReponseComponent {
  reclamations: any[] = [];

  constructor(
    private reclamationService: ReclamationService,
    private reponseService: ReponseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.reclamationService.getReclamations().subscribe({
      next: (data) => {
        this.reclamations = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement', err);
        this.snackBar.open('Erreur de chargement des réclamations', 'Fermer', { duration: 3000 });
      }
    });
  }

  /**
   * Ouvre la boîte de dialogue pour répondre ou voir/modifier la réponse.
   * 1) Tente de charger la réponse existante via getReponseByReclamation().
   * 2) S'il y en a une, on pré-remplit le champ dans la dialog.
   * 3) Sinon, on ouvre la dialog avec un champ vide.
   */
  openResponseDialog(reclamation: any): void {
    this.reponseService.getReponseByReclamation(reclamation.id).subscribe({
      next: (existingReponse) => {
        // On a trouvé une réponse -> on ouvre la dialog en mode "update"
        const dialogRef = this.dialog.open(ReponseDialogComponent, {
          width: '600px',
          data: {
            reclamation: reclamation,
            existingText: existingReponse.statut // On suppose que la réponse est stockée dans "statut"
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.loadReclamations();
          }
        });
      },
      error: (err) => {
        // Erreur 404 ou autre -> aucune réponse existante
        const dialogRef = this.dialog.open(ReponseDialogComponent, {
          width: '600px',
          data: {
            reclamation: reclamation,
            existingText: '' // pas de texte
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.loadReclamations();
          }
        });
      }
    });
  }
 
  openDescriptionModal(fullDesc: string): void {
    this.dialog.open(DescriptionModalComponent, {
      width: '600px',
      data: { description: fullDesc }
    });
  }

  /**
   * Retourne le nombre de mots dans une description
   */
  countWords(desc: string): number {
    if (!desc) return 0;
    return desc.trim().split(/\s+/).length;
  }

  /**
   * Retourne les n premiers mots d'une description
   */
  getFirstWords(desc: string, n: number): string {
    if (!desc) return '';
    const words = desc.trim().split(/\s+/);
    return words.slice(0, n).join(' ');
  }
  
}