import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
=======
>>>>>>> 4a62b3d0f2e93a753229587e9180075cd09cc5a4


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;

   constructor(private authService: AuthService, private router: Router,public dialog: MatDialog) {}
 
   logout(): void {
     this.authService.logout();
     this.router.navigate(['/login']);
   }

}
