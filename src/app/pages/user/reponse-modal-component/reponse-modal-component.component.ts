import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReponseService } from 'src/app/services/reponse.service';

@Component({
  selector: 'app-reponse-modal-component',
  templateUrl: './reponse-modal-component.component.html',
  styleUrls: ['./reponse-modal-component.component.scss']
})
export class ReponseModalComponentComponent {
  reponse: any;

  constructor(
    public dialogRef: MatDialogRef<ReponseModalComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reponseService: ReponseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Récupérer la réponse via l'id de la réclamation
    this.reponseService.getReponseByReclamation(this.data.id).subscribe({
      next: (data) => this.reponse = data,
      error: (err) => {
        console.error('Erreur lors de la récupération de la réponse', err);
        this.snackBar.open('Erreur lors de la récupération de la réponse', 'Fermer', { duration: 3000 });
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
