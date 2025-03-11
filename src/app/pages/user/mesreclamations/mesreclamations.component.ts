import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ReclamationDialogComponent } from '../reclamation-dialog/reclamation-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ReponseModalComponentComponent } from '../reponse-modal-component/reponse-modal-component.component';
import { DescriptionModalComponent } from '../description-modal/description-modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mesreclamations',
  templateUrl: './mesreclamations.component.html',
  styleUrls: ['./mesreclamations.component.scss']
})
export class MesreclamationsComponent {
 // Tableau complet récupéré depuis le service
 reclamations: any[] = [];
 // Tableau filtré (pour la recherche)
 filteredReclamations: any[] = [];
 // Tableau final paginé (celui qu'on envoie au mat-table)
 pagedReclamations: any[] = [];

 displayedColumns: string[] = ['sujet', 'description', 'type', 'statut', 'actions'];

 // Paramètres de pagination
 pageSize = 5;
 pageIndex = 0;
cin!:string;
 constructor(
   private reclamationService: ReclamationService,
   private snackBar: MatSnackBar,
   public dialog: MatDialog,
   private authService:AuthService
 ) {}

 ngOnInit(): void {
  const currentUser = this.authService.currentUserSubject.getValue();
  if(currentUser != null){
    this.cin = currentUser.cin
  }
   this.getReclamations();
 }

 /**
  * Récupère toutes les réclamations et initialise les tableaux.
  */
 getReclamations(): void {
   this.reclamationService.getReclamations().subscribe({
     next: (data) => {
      
       // On stocke toutes les réclamations
       this.reclamations = data;
       // On initialise filteredReclamations
       this.filteredReclamations = this.reclamations.filter(reclamation => reclamation.cin === this.cin);
       // On applique la pagination initiale
       this.updatePagedReclamations();
     },
     error: (err) => {
       console.error('Erreur lors de la récupération :', err);
       this.snackBar.open('Erreur de récupération des réclamations', 'Fermer', { duration: 3000 });
     }
   });
 }


 downloadPdf(): void {
  this.reclamationService.downloadPdf().subscribe({
    next: (pdfBlob) => {
      const blob = new Blob([pdfBlob], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'reclamations.pdf';
      link.click();

      // Nettoyer l'URL blob
      window.URL.revokeObjectURL(url);
    },
    error: (err) => {
      console.error('Erreur lors du téléchargement du PDF :', err);
      this.snackBar.open('Erreur lors du téléchargement du PDF', 'Fermer', { duration: 3000 });
    }
  });
}

 /**
  * Filtrage côté client.
  */
 onSearch(event: any): void {
   const searchTerm = event.target.value.toLowerCase().trim();
   if (!searchTerm) {
     // Si champ vide, on réinitialise
     this.filteredReclamations = [...this.reclamations];
   } else {
     this.filteredReclamations = this.reclamations.filter(r =>
       (r.sujet && r.sujet.toLowerCase().includes(searchTerm)) ||
       (r.description && r.description.toLowerCase().includes(searchTerm)) ||
       (r.type && r.type.toLowerCase().includes(searchTerm)) ||
       (r.statut && r.statut.toLowerCase().includes(searchTerm))
     );
   }
   // Réappliquer la pagination (on revient page 0)
   this.pageIndex = 0;
   this.updatePagedReclamations();
 }

 /**
  * Mettre a jour la liste paginé en fonction de pageIndex/pageSize.
  */
 updatePagedReclamations(): void {
   const startIndex = this.pageIndex * this.pageSize;
   const endIndex = startIndex + this.pageSize;
   this.pagedReclamations = this.filteredReclamations.slice(startIndex, endIndex);
 }

 /**
  * Gestion de l'événement de pagination.
  */
 onPageChange(event: PageEvent): void {
   this.pageIndex = event.pageIndex;
   this.pageSize = event.pageSize;
   this.updatePagedReclamations();
 }

 /**
  * Ouvre la dialog pour la création ou la modification.
  * Si une réclamation est passée en paramètre, c'est une mise à jour.
  */
 openDialog(reclamation?: any): void {
   const dialogRef = this.dialog.open(ReclamationDialogComponent, {
     width: '600px',
     data: reclamation ? { ...reclamation } : null
   });

   dialogRef.afterClosed().subscribe((result) => {
     if (result === true) {
       this.getReclamations();
     }
   });
 }

 /**
  * Ouvre la fenêtre de confirmation avant suppression.
  */
 openDeleteDialog(reclamation: any): void {
   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
     width: '400px',
     data: {
       title: 'Confirmation de suppression',
       message: 'Êtes-vous sûr de vouloir supprimer cette réclamation ?'
     }
   });

   dialogRef.afterClosed().subscribe(result => {
     if (result === true) {
       this.deleteReclamation(reclamation);
     }
   });
 }

 /**
  * Supprime la réclamation.
  */
 deleteReclamation(reclamation: any): void {
   if (!reclamation?.id) return;
   this.reclamationService.deleteReclamation(reclamation.id).subscribe({
     next: (response) => {
       this.getReclamations();
       this.snackBar.open('Réclamation supprimée avec succès', 'Fermer', { duration: 3000 });
     },
     error: (err) => {
       console.error('Erreur lors de la suppression :', err);
       this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 });
     }
   });
 }

 openResponseModal(reclamation: any): void {
   this.dialog.open(ReponseModalComponentComponent, {
     width: '500px',
     data: reclamation
   });
 }

 openDescriptionModal(fullDesc: string): void {
   this.dialog.open(DescriptionModalComponent, {
     width: '600px',
     data: { description: fullDesc }
   });
 }

 countWords(desc: string): number {
  if (!desc) return 0;
  return desc.trim().split(/\s+/).length;
}
 getFirstWords(desc: string, n: number): string {
   if (!desc) return '';
   const words = desc.trim().split(/\s+/);
   return words.slice(0, n).join(' ');
 }
}