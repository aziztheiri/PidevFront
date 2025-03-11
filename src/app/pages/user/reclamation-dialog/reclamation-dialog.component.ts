import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-reclamation-dialog',
  templateUrl: './reclamation-dialog.component.html',
  styleUrls: ['./reclamation-dialog.component.scss']
})
export class ReclamationDialogComponent {
  reclamationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reclamationService: ReclamationService,
    public dialogRef: MatDialogRef<ReclamationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    this.reclamationForm = this.fb.group({
      sujet: [
        data?.sujet || '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(12)
        ]
      ],
      description: [
        data?.description || '',
        [
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(500)
        ]
      ],
      type: [data?.type || '', Validators.required],
      statut: [
        { value: data?.statut ? data?.statut : 'EN_ATTENTE', disabled: !data },
        Validators.required
      ]
    });
  }
  saveReclamation(): void {
    if (this.reclamationForm.invalid) {
      return;
    }

    if (this.data && this.data.id) {
      this.reclamationService.updateReclamation(this.data.id, this.reclamationForm.value).subscribe({
        next: () => {
          this.snackBar.open('Réclamation mise à jour avec succès', 'Fermer', {
            duration: 3000
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour :', err);
          this.snackBar.open('Erreur lors de la mise à jour', 'Fermer', {
            duration: 3000
          });
        }
      });
    } else {
      this.reclamationService.createReclamation(this.reclamationForm.getRawValue()).subscribe({
        next: () => {
          this.snackBar.open('Réclamation créée avec succès', 'Fermer', {
            duration: 3000
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Erreur lors de la création :', err);
          this.snackBar.open('Erreur lors de la création', 'Fermer', {
            duration: 3000
          });
        }
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}