import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  users: User[] = [];
  user: User = {} as User;
  loading: boolean = false;
  error: string = '';
  selectedUser: User | null = null;
  successMessage: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  selectedImageFile: File | undefined;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  private fetchUserDetails(): void {
    this.authService.getUserDetails().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (err) => console.error('Error fetching user details:', err)
    });
  }

  openUpdateModal(user: User): void {
    this.selectedUser = { ...this.user };
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

  closeUpdateModal(): void {
    this.selectedUser = null;
    this.successMessage = '';
    this.selectedImageFile = undefined; // Use undefined instead of null
    this.imagePreview = null;
  }

  onImageSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitUpdate(form: NgForm): void {
    // Check if form is valid; if not, mark all controls as touched to trigger error messages
    if (form.invalid) {
      Object.keys(form.controls).forEach(field => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }

    if (this.selectedUser) {
      this.userService
        .updateNotAdminUser(this.selectedUser.cin, this.selectedUser, this.selectedImageFile)
        .subscribe({
          next: (updatedUser) => {
            const index = this.users.findIndex(u => u.cin === updatedUser.cin);
            if (index !== -1) {
              this.users[index] = { ...updatedUser, showMenu: false };
            }
            this.successMessage = 'User updated successfully!';

            setTimeout(() => {
              this.closeUpdateModal();
              this.fetchUserDetails();
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
