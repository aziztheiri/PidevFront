import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SafeHtmlPipe } from './pipe';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  constructor(private insuranceInfoService: UserService) {}
  responseText: string = '';

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
}