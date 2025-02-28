import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {
  passwordForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  cin: string = '';
  constructor(private fb: FormBuilder, private userService: UserService,private auth:AuthService) { }
  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
    this.auth.getUserDetails().subscribe({
      next: (user: User) => {
        this.cin = user.cin;
      },
      error: (err) => {
        this.errorMessage = err.error ? err.error : 'Failed to load user details';
      }
    });
  }
  
  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.passwordForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const { oldPassword, newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      this.errorMessage = 'New password and confirm password do not match.';
      return;
    }

    this.userService.updatePassword(this.cin, oldPassword, newPassword).subscribe({
      next: (response) => {
        this.successMessage = response;
        this.passwordForm.reset();
      },
      error: (error) => {
        this.errorMessage = error.error ? 'Wrong old password':error.error ;
      }
    });
  }
}
