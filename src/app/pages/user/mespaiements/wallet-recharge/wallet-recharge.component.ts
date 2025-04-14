import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-wallet-recharge',
  templateUrl: './wallet-recharge.component.html',
  styleUrls: ['./wallet-recharge.component.scss']
})
export class WalletRechargeComponent {
  rechargeAmount: number = 0;
  paypalSuccessMessage: string | null = null;
  paypalError: string | null = null;

  constructor(private http: HttpClient,private authService :AuthService) {}

  ngOnInit(): void {
    this.loadPayPalScript();
  }

  loadPayPalScript() {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AU6MDYYQAx_o--v0mcocH47xwnKdLjYisVK9fqhCPXsBaDR4ObNSkrl9yE3gUY2D8UMR5xHasoi0BeMS&currency=EUR&debug=true';
    script.onload = () => this.renderPayPalButton();
    document.body.appendChild(script);
  }

  renderPayPalButton() {
    (window as any).paypal.Buttons({
      style: {
        layout: 'vertical',
        color:  'blue',
        shape:  'rect',
        label:  'paypal'
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.rechargeAmount.toFixed(2)
            }
          }]
        }).then((orderID: string) => {
          console.log("OrderID généré : ", orderID);  // Assurez-vous que l'orderID est bien généré
          return orderID;
        });
      },
      onApprove: async (data: any, actions: any) => {
        console.log("PayPal Order Approved: ", data);
        try {
          const res: any = await this.http.post('http://localhost:8090/paiements/enligne/paypal/validate', {
            orderID: data.orderID,
            
              headers: this.authService.getAuthHeaders()
            
          }).toPromise();
          
          console.log("Réponse backend : ", res);  // Affichez la réponse du backend
          this.paypalSuccessMessage = res.message;
          this.paypalError = null;
        } catch (error: any) {
          console.error("Erreur lors de la validation : ", error);  // Affichez l'erreur si elle se produit
          this.paypalError = error.error.message || 'Erreur inconnue.';
          this.paypalSuccessMessage = null;
        }
      },
      onError: (err: any) => {
        console.error("Erreur PayPal : ", err);  // Affichez les erreurs liées à PayPal
        this.paypalError = 'Erreur avec PayPal.';
      }
    }).render('#paypal-button-container');
  }
}
