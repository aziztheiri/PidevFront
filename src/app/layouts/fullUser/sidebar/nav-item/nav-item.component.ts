import { Component, Input, OnChanges } from '@angular/core';
import { NavItem } from './nav-item';
import { Router } from '@angular/router';
import { NavService } from '../../../../services/nav.service';

@Component({
  selector: 'app1-nav-item',
  templateUrl: './nav-itemUser.component.html',
  styleUrls: ['../sidebar.component.scss'],
})
export class AppNavUserItemComponent implements OnChanges {
  @Input() item: NavItem | any;
  @Input() depth: any;
  isParentActive = false; // Add this property to track parent active state

  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // Handle active state logic for items with routes
        this.isParentActive = this.router.isActive(this.item.route, true);
      } else if (this.item.children && this.item.children.length) {
        // Handle active state logic for parent items
        this.isParentActive = this.item.children.some((child: NavItem) =>
          this.router.isActive(child.route || '', true)
        );
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      // If the item has no children, navigate to its route
      this.router.navigate([item.route]);
    } else {
      // If the item has children, toggle the expansion
      item.expanded = !item.expanded;
    }

    // Scroll to the top of the page
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0,
    });
  }
}