import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app1-header',
  templateUrl: './headerUser.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderUserComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  userName: string = ''; 
  userImageUrl: string | undefined = ''; // Propriété pour l'image de l'utilisateur


  constructor(private authService: AuthService, private router: Router,public dialog: MatDialog) {}
  ngOnInit(): void {
    // Call getUserDetails() to fetch the full user information using the email from the token
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userName = user.name;
        this.userImageUrl = user.image;
      }
    });

    // Initial fetch to load user data
    this.authService.getUserDetails().subscribe({
      error: (err) => console.error('Error fetching user details:', err)
    });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  goToProfile(): void {
    this.router.navigate(['/user/profile']); 
  }
  gotoUpdate():void{
    this.router.navigate(['/user/updatePassword'])
  }
}