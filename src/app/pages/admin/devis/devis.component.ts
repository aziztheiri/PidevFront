import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DevisService } from '../../../services/devis.service';
import { Devis } from '../../../models/devis.model';
import { Router } from '@angular/router';
import { OpenAIService } from '../../../services/openai.service';
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
    'actions', 
  ];
  dataSource: MatTableDataSource<Devis>;
  totalDevis: number = 0;
  assuranceTypes: { name: string; count: number }[] = [];
  selectedType: string = '';
  searchText: string = '';
  aiSummary: string = '';

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

  constructor(private devisService: DevisService, private router: Router, private openaiService: OpenAIService) {
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

  // Generate AI Summary
  generateAISummary(): void {
    const devisData = this.dataSource.data;
    const prompt = `Analyze the following devis data and provide a summary:
      ${JSON.stringify(devisData, null, 2)}
      Focus on trends, anomalies, and recommendations.`;
  
    console.log('Prompt sent to OpenAI:', prompt); // Log the prompt
  
    // Add a delay to avoid rate limits
    setTimeout(() => {
      this.openaiService.generateSummary(prompt).subscribe(
        (response: any) => {
          console.log('OpenAI API response:', response); // Log the response
          this.aiSummary = response.choices[0].text.trim();
        },
        (error: any) => {
          console.error('Error generating AI summary:', error); // Log the error
          console.error('Error details:', error.error); // Log the full error response
          this.aiSummary = 'Failed to generate summary. Please try again.';
        }
      );
    }, 3000); // Delay of 3 seconds between requests
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

  console.log('Assurance Types Data:', this.assuranceTypes); // Log the data

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

  console.log('Status Counts Data:', statusCounts); // Log the data

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

  viewDetails(devis: Devis): void {
    this.router.navigate(['/admin/devis-details', devis.id]);
  }

  deleteDevis(devis: Devis): void {
    if (!devis.id) {
      console.error('Devis ID is undefined');
      return;
    }
  
    if (confirm('Êtes-vous sûr de vouloir supprimer ce devis ?')) {
      this.devisService.deleteDevisAndRelatedAssurance(devis).subscribe(
        () => {
          this.loadDevis(); // Reload the table after deletion
        },
        (error) => {
          console.error('Error deleting devis:', error);
        }
      );
    }
  }
}