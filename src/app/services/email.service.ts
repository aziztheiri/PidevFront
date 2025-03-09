import { Injectable } from '@angular/core';
import * as sgMail from '@sendgrid/mail';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {
    // Set your SendGrid API key
    sgMail.setApiKey('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'); // Replace with your actual SendGrid API key
  }

  sendEmail(to: string, subject: string, text: string): Promise<void> {
    const msg = {
      to,
      from: 'montassarbenmesmia@outlook.com', // Replace with your verified sender email
      subject,
      text,
    };

    return sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent successfully');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        throw error; // Re-throw the error to handle it in the component
      });
  }
}