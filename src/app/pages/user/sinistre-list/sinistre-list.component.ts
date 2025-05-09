import { Component, OnInit } from '@angular/core';
import { SinistreService } from 'src/app/services/sinistres/sinistre.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Sinistre } from 'src/app/models/sinistre';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-sinistre-list',
  templateUrl: './sinistre-list.component.html',
  styleUrls: ['./sinistre-list.component.scss']
})
export class SinistreListComponent implements OnInit {
  sinistres: Sinistre[] = [];
  predictions: { [id: number]: number } = {};
  isLoading = true;
  errorMessage: string | null = null;
  searchText = '';
  selectedStatut = '';
  sortColumn: keyof Sinistre | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  statutsDisponibles = ['En attente', 'Validé', 'Rejeté'];

  constructor(
    private sinistreService: SinistreService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadSinistres();
  }

  loadSinistres(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.sinistreService.getSinistres().subscribe({
      next: data => {
        this.sinistres = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement.';
        this.isLoading = false;
      }
    });
  }

  deleteSinistre(id: number): void {
    if (confirm('Confirmer suppression ?')) {
      this.sinistreService.deleteSinistre(id).subscribe({
        next: () => this.sinistres = this.sinistres.filter(s => s.id !== id),
        error: () => this.errorMessage = 'Erreur suppression.'
      });
    }
  }

  predictSeverity(s: Sinistre): void {
    const payload = {
      Weather_Conditions: s.weatherCondition,
      Road_Surface_Conditions: s.roadSurfaceCondition,
      Light_Conditions: s.lightCondition,
      Urban_or_Rural_Area: s.urbanOrRuralArea
    };

    this.apiService.predict(payload).subscribe({
      next: res => this.predictions[s.id] = res.prediction,
      error: () => alert(`Échec de la prédiction pour #${s.id}`)
    });
  }

  getLabel(pred: number): string {
    return pred === 1 ? 'Légère ou modérée' : 'Grave';
  }

  get filteredSinistres(): Sinistre[] {
    return this.sinistres
      .filter(s =>
        s.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
        s.lieu.toLowerCase().includes(this.searchText.toLowerCase())
      )
      .filter(s => !this.selectedStatut || s.statut === this.selectedStatut)
      .sort((a, b) => this.sortTable(a, b));
  }

  private sortTable(a: Sinistre, b: Sinistre): number {
    if (!this.sortColumn) return 0;
    const aVal = a[this.sortColumn] as any;
    const bVal = b[this.sortColumn] as any;
    return typeof aVal === 'string'
      ? this.sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      : this.sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
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
    let x = 10, y = 20, h = 10;

    doc.setFontSize(16);
    doc.text('Liste des Sinistres', x, y - 5);

    const heads = ['ID', 'Date', 'Desc', 'Statut', 'Montant', 'Lieu', 'Type', 'Resp.', 'Tél.', 'Météo', 'Route', 'Lumière', 'Zone', 'Clôture'];
    heads.forEach((t, i) => {
      doc.rect(x + i * 20, y, 20, h);
      doc.text(t, x + i * 20 + 2, y + 7);
    });

    this.filteredSinistres.forEach((s, i) => {
      const row = [
        s.id.toString(),
        new Date(s.dateDeclaration).toLocaleDateString(),
        s.description,
        s.statut,
        s.montantEstime.toString(),
        s.lieu,
        s.typeSinistre,
        s.responsabilite,
        s.telephone,
        s.weatherCondition,
        s.roadSurfaceCondition,
        s.lightCondition,
        s.urbanOrRuralArea === 1 ? 'Urbain' : 'Rural',
        s.dateCloture ? new Date(s.dateCloture).toLocaleDateString() : 'Non'
      ];
      row.forEach((c, j) => {
        doc.rect(x + j * 20, y + (i + 1) * h, 20, h);
        doc.text(c, x + j * 20 + 2, y + (i + 1) * h + 7);
      });
    });

    doc.save('sinistres.pdf');
  }
}
