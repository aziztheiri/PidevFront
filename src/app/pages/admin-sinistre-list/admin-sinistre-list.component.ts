import { Component } from '@angular/core';
import { Sinistre } from 'src/app/models/sinistre';
import { SinistresService } from 'src/app/services/sinistres.service';
import { jsPDF } from 'jspdf';
import { Chart } from 'chart.js';  
@Component({
  selector: 'app-admin-sinistre-list',
  templateUrl: './admin-sinistre-list.component.html',
  styleUrls: ['./admin-sinistre-list.component.scss']
})
export class AdminSinistreListComponent {
  [x: string]: any;
  sinistres: Sinistre[] = [];
  filteredSinistres: Sinistre[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  searchText: string = '';
  selectedStatut: string = '';
  sortColumn: keyof Sinistre | '' = '';
  sortDirection: string = 'asc';
  statutsDisponibles: string[] = ['En attente', 'Validé', 'Rejeté'];

  // Propriété pour le graphique
  chart: any;

  constructor(private sinistreService: SinistresService) {}

  ngOnInit(): void {
    this.loadSinistres();
    this.initializeChart(); // Initialiser le graphique après le chargement des sinistres
  }

  loadSinistres(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.sinistreService.getSinistres().subscribe(
      (data: Sinistre[]) => {
        this.sinistres = data;
        this.filteredSinistres = data; // Initialiser avec tous les sinistres
        this.isLoading = false;
        this.updateChartData(); // Mettre à jour les données du graphique
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
          this.filteredSinistres = this.filteredSinistres.filter(s => s.id !== id);
        },
        (error) => {
          this.errorMessage = 'Erreur lors de la suppression.';
          console.error('Erreur:', error);
        }
      );
    }
  }
  
  initializeChart(): void {
    const ctx = (document.getElementById('sinistreChart') as HTMLCanvasElement).getContext('2d');
    this.chart = new Chart(ctx!, {
      type: 'bar',  // Type de graphique : ici un graphique à barres
      data: {
        labels: [],  // Les labels seront les statuts des sinistres
        datasets: [
          {
            label: 'Nombre de Sinistres',
            data: [],  // Les données seront le nombre de sinistres par statut
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true }
        }
      }
    });
  }

  updateChartData(): void {
    const statuts = ['En attente', 'Validé', 'Rejeté'];
    const sinistreCountByStatus = statuts.map(statut => {
      return this.filteredSinistres.filter(s => s.statut === statut).length;
    });

    // Mettre à jour les données et les labels du graphique
    this.chart.data.labels = statuts;
    this.chart.data.datasets[0].data = sinistreCountByStatus;
    this.chart.update(); // Mettre à jour le graphique
  }

  filterSinistres(): void {
    this.filteredSinistres = this.sinistres.filter(s =>
      (this.searchText === '' || s.description.toLowerCase().includes(this.searchText.toLowerCase()) || s.lieu.toLowerCase().includes(this.searchText.toLowerCase())) &&
      (this.selectedStatut === '' || s.statut === this.selectedStatut)
    );
    this.updateChartData(); // Mettre à jour les données du graphique après filtrage
  }

  generatePDF(): void {
    const doc = new jsPDF();
    let startX = 10;
    let startY = 20;
    let rowHeight = 10;
    let colWidths = [10, 30, 50, 30, 30, 30, 30, 30, 30]; 
    let margin = 5;

    doc.setFontSize(16);
    doc.text('Liste des Sinistres', startX, startY - 5);

    const headers = ['ID', 'Date', 'Description', 'Statut', 'Montant', 'Lieu', 'Type', 'Resp.', 'Clôture'];

    headers.forEach((header, i) => {
      doc.rect(startX, startY, colWidths[i], rowHeight);
      doc.text(header, startX + margin, startY + 7);
      startX += colWidths[i];
    });

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

    doc.save('sinistres_admin.pdf');
  }

  sortData(column: keyof Sinistre): void {
    this.sortColumn = column;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  
    this.filteredSinistres.sort((a, b) => {
      let valueA = a[column];
      let valueB = b[column];
  
      // Vérification de type et gestion des valeurs nulles ou undefined
      if (valueA === null || valueA === undefined) {
        valueA = '';
      }
      if (valueB === null || valueB === undefined) {
        valueB = '';
      }
  
      // Si la valeur est une chaîne de caractères, on peut utiliser toLowerCase()
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
  
      // Comparaison de valeurs pour le tri
      if (this.sortDirection === 'asc') {
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
      } else {
        if (valueA < valueB) return 1;
        if (valueA > valueB) return -1;
      }
  
      return 0; // Si égaux
    });
  }
}
