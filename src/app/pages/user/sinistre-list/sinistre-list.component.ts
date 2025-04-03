import { Component } from '@angular/core';
import { Sinistre } from 'src/app/models/sinistre';
import { SinistresService } from 'src/app/services/sinistres.service';
import { jsPDF } from 'jspdf';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sinistre-list',
  templateUrl: './sinistre-list.component.html',
  styleUrls: ['./sinistre-list.component.scss']
})
export class SinistreListComponent {
  sinistres: Sinistre[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  searchText: string = '';
  selectedStatut: string = '';
  sortColumn: keyof Sinistre | '' = '';
  sortDirection: string = 'asc';
  statutsDisponibles: string[] = ['En attente', 'Validé', 'Rejeté'];

  constructor(private sinistreService: SinistresService,private authService : AuthService) {}

  ngOnInit(): void {

    this.loadSinistres();
  }

  loadSinistres(): void {
    const currentUser = this.authService.currentUserSubject.getValue();

    this.isLoading = true;
    this.errorMessage = null;

    this.sinistreService.getSinistres().subscribe(
      (data: Sinistre[]) => {
      this.sinistres = data.filter(sinistre => sinistre.cin === currentUser?.cin);
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des sinistres.';
        this.isLoading = false;
        console.error('Erreur:', error);
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
          this.errorMessage = 'Erreur lors de la suppression.';
          console.error('Erreur:', error);
        }
      );
    }
  }

  get filteredSinistres(): Sinistre[] {
    return this.sinistres
      .filter(s =>
        s.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
        s.lieu.toLowerCase().includes(this.searchText.toLowerCase())
      )
      .filter(s => this.selectedStatut === '' || s.statut === this.selectedStatut)
      .sort((a, b) => this.sortTable(a, b));
  }

  sortTable(a: Sinistre, b: Sinistre): number {
    if (this.sortColumn === '') return 0;

    let valueA = a[this.sortColumn] ?? '';
    let valueB = b[this.sortColumn] ?? '';

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return this.sortDirection === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return this.sortDirection === 'asc'
      ? (valueA as number) - (valueB as number)
      : (valueB as number) - (valueA as number);
  }

  sortSinistres(column: keyof Sinistre): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }
  generatePDF(): void {
    const doc = new jsPDF();
    let startX = 10;
    let startY = 20;
    let rowHeight = 10;
    let colWidths = [10, 30, 50, 30, 30, 30, 30, 30, 30]; // Largeurs des colonnes
    let margin = 5;
  
    // **Titre du document**
    doc.setFontSize(16);
    doc.text('Liste des Sinistres', startX, startY - 5);
  
    // **Définition des en-têtes**
    const headers = ['ID', 'Date', 'Description', 'Statut', 'Montant', 'Lieu', 'Type', 'Resp.', 'Clôture'];
  
    headers.forEach((header, i) => {
      doc.rect(startX, startY, colWidths[i], rowHeight);
      doc.text(header, startX + margin, startY + 7);
      startX += colWidths[i];
    });
  
    // **Ajout des lignes de données**
    startX = 10;
    this.filteredSinistres.forEach((s, rowIndex) => {
      let currentY = startY + (rowIndex + 1) * rowHeight;
      let row = [
        s.id.toString(),
        new Date(s.dateDeclaration).toLocaleDateString(),
        s.description,
        s.statut,
        s.montantEstime.toString(),
        s.lieu,
        s.typeSinistre,
        s.responsabilite,
        s.dateCloture ? new Date(s.dateCloture).toLocaleDateString() : 'Non clôturé'
      ];
  
      row.forEach((cell, colIndex) => {
        doc.rect(startX, currentY, colWidths[colIndex], rowHeight);
        doc.text(cell, startX + margin, currentY + 7);
        startX += colWidths[colIndex];
      });
      startX = 10;
    });
  
    // **Téléchargement du fichier**
    doc.save('sinistres.pdf');
  }
  
}
