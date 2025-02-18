import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users = [
    { name: 'Alice Smith', email: 'alice@example.com', role: 'Admin', status: 'active', image: './assets/images/user1.jpg' },
    { name: 'John Doe', email: 'john@example.com', role: 'Editor', status: 'inactive', image: './assets/images/user2.jpg' },
    { name: 'Emily Brown', email: 'emily@example.com', role: 'User', status: 'active', image: './assets/images/user3.jpg' }
  ];
}
