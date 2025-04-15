import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wallet-recharge',
  templateUrl: './wallet-recharge.component.html',
  styleUrls: ['./wallet-recharge.component.scss']
})
export class WalletRechargeComponent implements OnInit {
  rechargeAmount: number = 0;
  paypalSuccessMessage: string | null = null;
  paypalError: string | null = null;
  isButtonRendered: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onAmountChange() {
    this.paypalSuccessMessage = null;
    this.paypalError = null;

    // Ne pas recréer le bouton inutilement
    if (this.rechargeAmount > 0 && !this.isButtonRendered) {
      this.loadPayPalScript();
    }
  }

  loadPayPalScript() {
    if ((window as any).paypal) {
      this.renderPayPalButton();
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=AU6MDYYQAx_o--v0mcocH47xwnKdLjYisVK9fqhCPXsBaDR4ObNSkrl9yE3gUY2D8UMR5xHasoi0BeMS&disable-funding=card&currency=EUR&debug=true';
      script.onload = () => this.renderPayPalButton();
      document.body.appendChild(script);
    }
  }

  renderPayPalButton() {
    this.isButtonRendered = true;

    (window as any).paypal.Buttons({
      style: {
        layout: 'vertical',
        color:'silver',
        shape:  'rect',
        label:  'paypal'
      },
      createOrder: async () => {
        try {
          const response: any = await this.http.post('http://localhost:8080/paiements/enligne/paypal/create-order', { montant: this.rechargeAmount.toFixed(2)
          }).toPromise();

          return response.orderID;
        } catch (error) {
          this.paypalError = 'Erreur lors de la création de l’ordre.';
          throw error;
        }
      },

      onApprove: async (data: any, actions: any) => {
        try {
          const res: any = await this.http.post('http://localhost:8080/paiements/enligne/paypal/capture-order', {
            orderID: data.orderID,
            montant: this.rechargeAmount.toFixed(2),
            userId: 1
          }).toPromise();

          this.paypalSuccessMessage = '✅ Paiement effectué avec succès !';
          this.paypalError = null;
        } catch (error: any) {
          this.paypalError = error.error?.message || 'Erreur lors de la capture.';
          this.paypalSuccessMessage = null;
        }
      },

      onError: (err: any) => {
        this.paypalError = 'Erreur avec PayPal.';
      }

    }).render('#paypal-button-container');
  }
}
