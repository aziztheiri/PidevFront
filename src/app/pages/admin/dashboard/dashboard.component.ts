import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexStroke, ApexXAxis, ApexYAxis, ApexTitleSubtitle, ApexLegend } from 'ng-apexcharts';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AppDashboardComponent implements OnInit {
  users: User[] = [];
  totalUsers = 0;
  verifiedUsers = 0;
  nonVerifiedUsers = 0;
  public locationChartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    title: ApexTitleSubtitle;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
    colors: string[];
  } = {
    series: [
      { name: 'Users', data: [] }
    ],
    chart: {
      type: 'bar',  // Chart type must be 'bar' here
      height: 350
    },
    title: {
      text: 'User Distribution by Location',
      align: 'left'
    },
    xaxis: {
      categories: []  // Initially empty, will populate with locations
    },
    yaxis: {
      title: { text: 'Number of Users' }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'top'
    },
    colors: ['#008FFB']
  };
  // Ensure `chartOptions` is properly initialized
  public chartOptions = {
    series: <ApexAxisChartSeries>[
      { name: 'User Growth', data: [] }
    ],
    chart: <ApexChart>{
      type: 'line',
      height: 350
    },
    title: <ApexTitleSubtitle>{
      text: 'User Growth Over Months',
      align: 'left'
    },
    xaxis: <ApexXAxis>{
      categories: []
    },
    yaxis: <ApexYAxis>{
      title: { text: 'Number of Users' }
    },
    stroke: <ApexStroke>{
      curve: 'smooth'
    },
    dataLabels: <ApexDataLabels>{
      enabled: false
    }
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.fetchUserLocationData();

  }
  private fetchUserLocationData() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users; // Update the users list from the service
      this.updateLocationChartData();
    });
  }

  // Update the chart data based on user locations
  private updateLocationChartData() {
    const locationCounts: { [key: string]: number } = {}; // Object to store location counts

    this.users.forEach(user => {
      const location = user.location;
      if (locationCounts[location]) {
        locationCounts[location]++;
      } else {
        locationCounts[location] = 1;
      }
    });

    // Prepare chart data
    const locations = Object.keys(locationCounts); // Extract unique locations
    const counts = Object.values(locationCounts); // Extract counts for each location

    // Update chart series and categories
    this.locationChartOptions.series = [
      { name: 'Users', data: counts }
    ];
    this.locationChartOptions.xaxis = {
      categories: locations
    };
  }
  private loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      console.log(users)
      this.totalUsers = this.users.length;
      this.verifiedUsers = this.users.filter(user => user.verified).length;
      this.nonVerifiedUsers = this.totalUsers - this.verifiedUsers;
      this.updateChart();
    });
  }

  private updateChart(): void {
    this.chartOptions.series = [{ name: 'User Growth', data: this.getUserGrowthData() }];
    this.chartOptions.xaxis.categories = this.getMonthLabels();
  }

  private getMonthLabels(): string[] {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  private getUserGrowthData(): number[] {
    const monthlyCounts = new Array(12).fill(0);
    this.users.forEach(user => {
      const month = new Date(user.creationDate).getMonth();
      monthlyCounts[month]++;
    });
    return monthlyCounts;
  }
}