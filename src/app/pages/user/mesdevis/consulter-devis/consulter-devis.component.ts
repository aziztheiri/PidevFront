import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DevisService } from '../../../../services/devis.service';
import { Devis } from '../../../../models/devis.model';
import * as XLSX from 'xlsx'; // Import the xlsx library

@Component({
  selector: 'app-consulter-devis',
  templateUrl: './consulter-devis.component.html',
  styleUrls: ['./consulter-devis.component.scss'],
})
export class ConsulterDevisComponent implements OnInit {
  displayedColumns: string[] = ['cin', 'type', 'reference', 'date', 'total', 'statut', 'actions'];
  dataSource: MatTableDataSource<Devis> = new MatTableDataSource<Devis>([]);
  originalData: Devis[] = []; // Store original data for filtering
  selectedType: string | null = null; // Track selected filter type

  // Assurance types with icons and labels
  assuranceTypes = [
    { value: 'ECOLE', label: 'Scolaire', icon: 'school' },
    { value: 'VOYAGE', label: 'Voyage', icon: 'flight' },
    { value: 'HABITATION', label: 'Habitation', icon: 'home' },
    { value: 'ACCIDENTS', label: 'Accidents', icon: 'warning' },
    { value: 'CAPITALISATION', label: 'Capitalisation', icon: 'savings' },
    { value: 'PREVOYANCE', label: 'Prévoyance', icon: 'health_and_safety' },
    { value: 'SANTE_INTERNATIONALE', label: 'Santé Internationale', icon: 'local_hospital' },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private devisService: DevisService) {}

  ngOnInit(): void {
    const cin = '11111111'; // Replace with the desired CIN or fetch it dynamically
    this.fetchDevisByCin(cin);
  }

  fetchDevisByCin(cin: string): void {
    this.devisService.getDevisByCin(cin).subscribe({
      next: (devisList) => {
        this.originalData = devisList; // Store original data
        this.dataSource.data = devisList; // Assign to dataSource
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error fetching devis by CIN:', error);
      },
    });
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('fr-FR'); // Format as French date
  }

  toggleFilter(type: string): void {
    if (this.selectedType === type) {
      this.selectedType = null; // Unselect if already selected
      this.dataSource.data = this.originalData; // Reset to original data
    } else {
      this.selectedType = type; // Select the filter
      this.dataSource.data = this.originalData.filter(
        (devis) => devis.typeAssurance === type
      ); // Filter by type
    }
  }

  deleteDevis(devis: Devis): void {
    if (!devis.id) {
      console.error('Devis ID is undefined');
      return;
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer ce devis ?')) {
      this.devisService.deleteDevis(devis.id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter((d) => d.id !== devis.id); // Remove from table
        },
        error: (error) => {
          console.error('Error deleting devis:', error);
        },
      });
    }
  }

  // Export to Excel
  exportToExcel(): void {
    const data = this.dataSource.data.map((devis) => ({
      CIN: devis.cin,
      Type: devis.typeAssurance,
      Référence: `DEV${devis.id}`,
      Date: this.formatDate(devis.dateCalcul),
      'Total TTC': `€${devis.montant.toFixed(2)}`,
      Statut: devis.statut,
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'Devis': worksheet }, SheetNames: ['Devis'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveAsExcelFile(excelBuffer, 'devis');
  }

  // Save the Excel file
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = URL.createObjectURL(data);
    a.download = `${fileName}_export_${new Date().getTime()}.xlsx`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
}