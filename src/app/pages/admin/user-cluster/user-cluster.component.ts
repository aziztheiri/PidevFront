import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ShapResult } from 'src/app/models/shap.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-cluster',
  templateUrl: './user-cluster.component.html',
  styleUrls: ['./user-cluster.component.scss']
})
export class UserClusterComponent {
  clusters: Record<string, User[]> = {};
  errorMessage = '';

  // Friendly names for each cluster
  clusterNames: Record<string, string> = {
    '0': 'Young Clients with High Lifetime Value',
    '1': 'Established High‑Income Clients',
    '2': 'Intermediate Multi‑Policy Clients',
    // add more as needed…
  };

  // Shared recommendations for each cluster
  clusterRecommendations: Record<string, string[]> = {
    '0': [
      'Offer loyalty discount',
      'Promote family plans',
      'Send birthday voucher'
    ],
    '1': [
      'Upsell comprehensive cover',
      'Invite to VIP events',
      'Recommend investment add‑ons'
    ],
    '2': [
      'Bundle home & auto policies',
      'Review coverage annually',
      'Provide educational webinar'
    ],
    // etc
  };

  shapByCluster: Record<string, number[]> = {};
  featureNames = [
    'Months Since Last Claim',
    'Total Claim Amount',
    'Monthly Premium Auto',
    'Customer Lifetime Value',
    'Vehicle Class_Luxury Car',
    'EmploymentStatus_Employed',
    'Location Code_Suburban'
  ];

  // track which cluster is open
  selectedCluster: string | null = null;
  showShapModal = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    forkJoin({
      users: this.userService.predictUsers(),
      shaps: this.userService.getShapValues()
    }).subscribe({
      next: ({ users, shaps }) => {
        this.groupUsers(users);
        this.aggregateShapByCluster(users, shaps);
      },
      error: err => this.errorMessage = err.message
    });
  }

  private groupUsers(users: User[]) {
    this.clusters = users.reduce((acc, user) => {
      const key = String(user.cluster);
      (acc[key] = acc[key] || []).push(user);
      return acc;
    }, {} as Record<string, User[]>);
  }

  private aggregateShapByCluster(users: User[], shaps: ShapResult[]) {
    const byCIN = new Map(shaps.map(s => [s.features.CIN, s] as const));

    Object.entries(this.clusters).forEach(([clusterKey, userList]) => {
      const k = Number(clusterKey);  // cluster index
      const perFeature: number[] = [];

      this.featureNames.forEach((_, i) => {
        const vals = userList
          .map(u => byCIN.get(u.features!.CIN))
          .filter((s): s is ShapResult => !!s)
          .map(s => s.shap_values[i][k]);

        const avg = vals.length
          ? vals.reduce((sum, v) => sum + v, 0) / vals.length
          : 0;
        perFeature.push(avg);
      });

      this.shapByCluster[clusterKey] = perFeature;
    });
  }

  // Open/closes the per‑cluster recommendations modal
  openClusterModal(clusterKey: string) {
    this.selectedCluster = clusterKey;
  }
  closeClusterModal() {
    this.selectedCluster = null;
  }

  // SHAP modal
  openShapModal() {
    this.showShapModal = true;
  }
  closeShapModal() {
    this.showShapModal = false;
  }
}