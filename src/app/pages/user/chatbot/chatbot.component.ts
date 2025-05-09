import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  data = {
    Weather_Conditions: '',
    Road_Surface_Conditions: '',
    Light_Conditions: '',
    Urban_or_Rural_Area: null as number | null
  };
  prediction: number | null = null;

  constructor(private apiService: ApiService) { }

  submitData() {
    if (this.data.Urban_or_Rural_Area !== 1.0 && this.data.Urban_or_Rural_Area !== 2.0) {
      alert('Urban_or_Rural_Area doit être 1.0 (urbain) ou 2.0 (rural).');
      return;
    }

    this.apiService.predict(this.data).subscribe(
      (response) => {
        this.prediction = response.prediction;
      },
      (error) => {
        console.error('Erreur lors de la prédiction', error);
        alert('Erreur : ' + (error.error?.error || 'Vérifiez les données saisies.'));
      }
    );
  }
}