import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  private apiUrl = 'https://api.openai.com/v1/completions';

  constructor(private http: HttpClient) {}

  generateSummary(prompt: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.openaiApiKey}`,
    });

    const body = {
      model: 'gpt-3.5-turbo-instruct', // Use the desired model
      prompt: prompt,
      max_tokens: 150, // Adjust as needed
    };
    console.log('Sending request to OpenAI API:', body); // Log the request payload

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}