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
  selectedUser: User | null = null;
  successMessage: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  selectedImageFile: File | undefined;
  sortBy: string = '';
  filterVerified: string = '';
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
    user.showMenu = !user.showMenu;
  }

  deleteUser(user: any): void {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.userService.deleteUser(user.cin).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.cin !== user.cin);
        },
        error: (err) => {
          console.error(err);
          alert('Error deleting user.');
        }
      });
    }
  }

  filterUsers(): User[] {
    const searchTerm = this.search_item.toLowerCase();

    // Initial search filtering
    let filteredUsers = this.users.filter(user =>
      user.cin.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      (user.location ? user.location.toLowerCase().includes(searchTerm) : false)
    );

    // Filter by verification status if selected
    if (this.filterVerified === 'verified') {
      filteredUsers = filteredUsers.filter(user => user.verified);
    } else if (this.filterVerified === 'notVerified') {
      filteredUsers = filteredUsers.filter(user => !user.verified);
    }

    // Apply sorting if a sort field is selected
    if (this.sortBy) {
      filteredUsers.sort((a: any, b: any) => {
        if (a[this.sortBy] < b[this.sortBy]) {
          return -1;
        } else if (a[this.sortBy] > b[this.sortBy]) {
          return 1;
        }
        return 0;
      });
    }

    return filteredUsers;
  }

  openUpdateModal(user: User): void {
    this.selectedUser = { ...user };
    this.selectedImageFile = undefined;
    this.successMessage = '';
    
    // Show existing image if available
    if (user.image) {
      this.imagePreview = user.image;
    }
    
    // Reset file input (optional)
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
  activateUser(user: any): void {
    if (confirm(`Are you sure you want to activate ${user.name}?`)) {
      this.userService.activateUser(user.cin).subscribe({
        next: () => {
          user.verified = true;  // Mark user as activated in the UI
          alert(`${user.name} has been activated.`);
        },
        error: (err) => {
          console.error(err);
          alert('Error activating user.');
        }
      });
    }
  }
  deactivateUser(user: any): void {
    if (confirm(`Are you sure you want to deactivate ${user.name}?`)) {
      this.userService.desactivateUser(user.cin).subscribe({
        next: () => {
          user.verified = false;  // Mark user as deactivated in UI
          alert(`${user.name} has been deactivated.`);
        },
        error: (err) => {
          console.error(err);
          alert('Error deactivating user.');
        }
      });
    }
  }
  closeUpdateModal(): void {
    this.selectedUser = null;
    this.successMessage = '';
    this.selectedImageFile = undefined; // Fix: Use undefined, not null
    this.imagePreview = null;
  }

  onImageSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]; // Local variable of type File
      this.selectedImageFile = file;
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file); // Now file is definitely a File
    }
  }

  submitUpdate(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.cin, this.selectedUser, this.selectedImageFile)
        .subscribe({
          next: (updatedUser) => {
            const index = this.users.findIndex(u => u.cin === updatedUser.cin);
            if (index !== -1) {
              this.users[index] = { ...updatedUser, showMenu: false };
            }
            this.successMessage = 'User updated successfully!';
            setTimeout(() => {
              this.closeUpdateModal();
            }, 2000);
          },
          error: (err) => {
            console.error(err);
            alert('Error updating user.');
          }
        });
    }
  }
}
