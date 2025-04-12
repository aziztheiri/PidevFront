import { UserService } from 'src/app/services/user.service';
import { SafeHtmlPipe } from './pipe';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('canvas', { static: false }) canvas!: ElementRef;
  qrRedeemed: boolean | undefined= false;
  qrCodeData = '';
  responseText = '';
  currentUser: User | null = null;
 
  constructor(private insuranceInfoService: UserService,private authService:AuthService,private router :Router) {}
  ngOnInit(): void {
    // Trigger user fetch
    this.authService.getUserDetails().subscribe({
      next: () => {},
      error: (err) => console.error('Error fetching user details:', err)
    });

    // Listen for user when ready
    this.authService.currentUser$.subscribe(user => {
      if (user && user.cin) {
        this.currentUser = user;
        this.qrCodeData = user.cin;
        this.eligibleForReduction = user.points > 2000;
        this.reductionApplied = user.reduction || false;

        this.qrRedeemed= user.qrCodeRedeemed;
        // Now draw QR code (if ViewChild is ready)
        setTimeout(() => {
          if (!this.qrRedeemed && this.canvas?.nativeElement) {
            QRCode.toCanvas(this.canvas.nativeElement, this.qrCodeData, error => {
              if (error) console.error('QR generation error:', error);
            });
          }
        }, 0);
      }
    });
  }
  user: User = {} as User;

  private fetchUserDetails(): void {
    this.authService.getUserDetails().subscribe({
      next: (user: User) => {
        this.user = user;
        this.reductionApplied = user.reduction ?? false; // set current reduction state
        this.eligibleForReduction = user.points > 2000;
      },
      error: (err) => console.error('Error fetching user details:', err)
    });
  }
  eligibleForReduction: boolean = false;

  
  fetchContent() {
    this.insuranceInfoService.getGeminiContent().subscribe(
      (data) => {
        // Assuming the backend now returns HTML formatted content.
        this.responseText = data.text;
      },
      (error) => {
        console.error('Error fetching content:', error);
        this.responseText = '<p>Error fetching content. Please try again.</p>';
      }
    );
  }
  reductionApplied = false;

applyReduction(): void {
  this.insuranceInfoService.applyReduction().subscribe({
    next: (response) => {
      alert('🎉 Reduction successfully applied to your devis!');
      this.reductionApplied = true;
      this.fetchUserDetails(); // Refresh user data
    },
    error: (error) => {
      alert('❌ Unable to apply reduction: ' + error.error);
    }
  });
}
  redeemQRCode(): void {
    this.insuranceInfoService.redeemQRCode().subscribe(
      res => {
        console.log(res);
        this.qrRedeemed = true;
        this.fetchUserDetails();

      },
      err => {
        console.error(err);
        alert('QR code already used or invalid.');
      }
    );
  }

}