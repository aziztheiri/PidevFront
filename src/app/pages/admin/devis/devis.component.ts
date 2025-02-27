import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DevisService } from '../../../services/devis.service';
import { Devis } from '../../../models/devis.model';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexLegend,
  ApexTooltip,
} from 'ng-apexcharts';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.scss'],
})
export class DevisComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'typeAssurance',
    'montant',
    'dateCalcul',
    'statut',
    'dateDebutContrat',
    'dateFinContrat',
  ];
  dataSource: MatTableDataSource<Devis>;
  totalDevis: number = 0;
  assuranceTypes: { name: string; count: number }[] = [];
  selectedType: string = '';
  searchText: string = '';

  // Chart configurations
  assuranceChart: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    legend: { show: boolean };
    labels: string[];
    colors: string[];
    dataLabels: { enabled: boolean };
    tooltip: { theme: string };
  } = {
    series: [],
    chart: {
      type: 'bar',
      height: 350,
    },
    legend: {
      show: true,
    },
    labels: [],
    colors: ['#f38f1d'],
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      theme: 'light',
    },
  };

  statusChart: {
    series: number[];
    chart: ApexChart;
    labels: string[];
    colors: string[];
    dataLabels: { enabled: boolean };
    tooltip: { theme: string };
  } = {
    series: [],
    chart: {
      type: 'pie',
      height: 350,
    },
    labels: [],
    colors: ['#004a8d', '#f38f1d', '#28a745', '#dc3545'],
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      theme: 'light',
    },
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private devisService: DevisService) {
    this.dataSource = new MatTableDataSource<Devis>([]);
  }

  ngOnInit(): void {
    this.loadDevis();
  }

  loadDevis(): void {
    this.devisService.getAllDevis().subscribe(
      (data: Devis[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.calculateStatistics();
        this.calculateStatusStatistics();
      },
      (error) => {
        console.error('Error fetching devis:', error);
      }
    );
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  calculateStatistics(): void {
    this.totalDevis = this.dataSource.data.length;

    const typeCounts: { [key: string]: number } = this.dataSource.data.reduce((acc, devis) => {
      acc[devis.typeAssurance] = (acc[devis.typeAssurance] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    this.assuranceTypes = Object.keys(typeCounts).map((type) => ({
      name: type,
      count: typeCounts[type],
    }));

    // Update the bar chart data
    this.assuranceChart.series = [
      {
        name: "Types d'Assurance",
        data: Object.values(typeCounts),
      },
    ];
    this.assuranceChart.labels = Object.keys(typeCounts);
  }

  calculateStatusStatistics(): void {
    const statusCounts: { [key: string]: number } = this.dataSource.data.reduce((acc, devis) => {
      acc[devis.statut] = (acc[devis.statut] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Update the pie chart data
    this.statusChart.series = Object.values(statusCounts) as number[];
    this.statusChart.labels = Object.keys(statusCounts);
  }

  formatId(id: number): string {
    if (id < 100) {
      return `REF${String(id).padStart(2, '0')}`;
    } else {
      return `REF${id}`;
    }
  }
}