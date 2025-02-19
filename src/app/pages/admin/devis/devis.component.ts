import { Component } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexLegend,
  ApexTooltip,
  ApexPlotOptions,
} from 'ng-apexcharts';

interface Devis {
  type: string;
  reference: string;
  date: Date;
  total: number;
  statut: string;
}

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.scss'],
})
export class DevisComponent {
  displayedColumns: string[] = ['type', 'reference', 'date', 'total', 'statut'];
  dataSource: Devis[] = [
    { type: 'accidents', reference: 'REF001', date: new Date(), total: 150.00, statut: 'En attente' },
    { type: 'capitalisation', reference: 'REF002', date: new Date(), total: 200.00, statut: 'Confirmé' },
    { type: 'habitation', reference: 'REF003', date: new Date(), total: 250.00, statut: 'Annulé' },
    { type: 'prevoyance', reference: 'REF004', date: new Date(), total: 300.00, statut: 'En attente' },
    { type: 'sante-internationale', reference: 'REF005', date: new Date(), total: 350.00, statut: 'Confirmé' },
    { type: 'scolaire', reference: 'REF006', date: new Date(), total: 400.00, statut: 'En attente' },
    { type: 'voyage', reference: 'REF007', date: new Date(), total: 450.00, statut: 'Confirmé' },
  ];

  totalDevis: number = 0; // Declare totalDevis property
  assuranceTypes: { name: string; count: number }[] = []; // Declare assuranceTypes property
  assuranceChart: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    legend: { show: boolean };
    labels: string[];
    colors: string[];
    dataLabels: { enabled: boolean };
    tooltip: { theme: string };
    plotOptions: ApexPlotOptions; // Add plotOptions to the chart type
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
    colors: ['#f38f1d'], // Set the color to orange
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      theme: 'light',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%', // Adjust the width of the bars
        // Remove endingShape as it's not a valid property
      },
    },
  };

  constructor() {
    this.calculateStatistics();
  }

  calculateStatistics() {
    this.totalDevis = this.dataSource.length; // Calculate total devis

    const typeCounts: { [key: string]: number } = this.dataSource.reduce((acc, devis) => {
      acc[devis.type] = (acc[devis.type] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    this.assuranceTypes = Object.keys(typeCounts).map(type => ({
      name: type,
      count: typeCounts[type],
    }));

    this.assuranceChart.series = [{
      name: 'Types d\'Assurance',
      data: Object.values(typeCounts),
    }];
    this.assuranceChart.labels = Object.keys(typeCounts);
  }
}