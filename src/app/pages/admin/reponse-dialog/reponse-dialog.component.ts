import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReponseService } from 'src/app/services/reponse.service';

@Component({
  selector: 'app-reponse-dialog',
  templateUrl: './reponse-dialog.component.html',
  styleUrls: ['./reponse-dialog.component.scss']
})
export class ReponseDialogComponent {
  reponseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reponseService: ReponseService,
    public dialogRef: MatDialogRef<ReponseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // data.reclamation, data.existingText
    private snackBar: MatSnackBar
  ) {
    // Pré-remplir le champ avec le texte existant si on en a un
    this.reponseForm = this.fb.group({
      reponseText: [this.data.existingText || '', Validators.required]
    });
  }

  /**
   * Enregistre la réponse (création ou mise à jour) via le même endpoint.
   */
  saveReponse(): void {
    if (this.reponseForm.invalid) {
      return;
    }
    const texte = this.reponseForm.value.reponseText;

    this.reponseService.createOrUpdateReponse(this.data.reclamation.id, texte)
      .subscribe({
        next: () => {
          this.snackBar.open('Réponse enregistrée avec succès', 'Fermer', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Erreur lors de l’enregistrement de la réponse', err);
          this.snackBar.open('Erreur lors de l’enregistrement', 'Fermer', { duration: 3000 });
        }
      });
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}