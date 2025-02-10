import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: User[] = [];
  loading: boolean = false;
  error: string = '';
  constructor(private userService: UserService) { }
  search_item: string = '';
  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error fetching users.';
        this.loading = false;
      }
    });
  }
  toggleMenu(user: any): void {
    // Toggle the dropdown menu for this user
    user.showMenu = !user.showMenu;
  }

  deleteUser(user: any): void {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.userService.deleteUser(user.cin).subscribe({
        next: (res) => {
          // Optionally, display a success message
          // Remove the deleted user from the list
          this.users = this.users.filter(u => u.cin !== user.cin);
        },
        error: (err) => {
          console.error(err);
          alert('Error deleting user.');
        }
      });
    }
  }
  filterUsers() {
    const searchTerm = this.search_item.toLowerCase();
    return this.users.filter(user =>
      user.cin.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      (user.location ? user.location.toLowerCase().includes(searchTerm) : false)
    );
  }
}
