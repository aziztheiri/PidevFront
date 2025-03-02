import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';

  constructor(private userservice: UserService,private router:Router) {}

  onSubmit() {
    if (!this.email.trim()) {
      this.message = 'Please enter your email address.';
      return;
    }
    this.userservice.requestPasswordReset(this.email).subscribe(
      res => {
        this.message = 'Reset password email sent. Please check your inbox.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000); 
      },
      err => {
        this.message = 'Error sending email. Please try again.';
      }
    );
  }
}
