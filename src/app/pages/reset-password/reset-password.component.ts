import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  token: string = '';
  newPassword: string = '';
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private userservice: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  validatePassword(password: string): string | null {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must include at least one capital letter.';
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return 'Password must include at least one symbol.';
    }
    return null;
  }

  onSubmit() {
    const validationError = this.validatePassword(this.newPassword);
    if (validationError) {
      this.message = validationError;
      return;
    }
    this.userservice.resetPassword(this.token, this.newPassword).subscribe(
      res => {
        this.message = 'Password reset successfully. You can now log in.';
        // Optionally, redirect to the login page:
        this.router.navigate(['/login']);
      },
      err => {
        this.message = 'Error resetting password. Please try again.';
      }
    );
  }
}
