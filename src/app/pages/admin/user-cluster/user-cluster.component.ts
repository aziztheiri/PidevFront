import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-cluster',
  templateUrl: './user-cluster.component.html',
  styleUrls: ['./user-cluster.component.scss']
})
export class UserClusterComponent {
  clusters: Record<string, User[]> = {};
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.predictUsers().subscribe({
      next: (predictedUsers: User[]) => {
        // Group users by cluster (using string keys to avoid undefined index issues)
        this.clusters = predictedUsers.reduce((acc: Record<string, User[]>, user: User) => {
          const clusterKey = user.cluster !== undefined ? user.cluster.toString() : 'undefined';
          if (!acc[clusterKey]) {
            acc[clusterKey] = [];
          }
          acc[clusterKey].push(user);
          return acc;
        }, {});
      },
      error: (err) => {
        this.errorMessage = 'Error fetching clustered users: ' + err.message;
      }
    });
  }
}
