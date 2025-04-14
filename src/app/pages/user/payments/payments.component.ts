import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Paiement, PaiementEnLigne, PaiementSurPlace } from '../../admin/servs/paiement.model';
import { PaiementService } from '../../admin/servs/paiement.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  paiements: Paiement[] = [];
  paiementsEnLigne: PaiementEnLigne[] = [];
  paiementsSurPlace: PaiementSurPlace[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  connectedCin!: string;

  constructor(
    private paiementService: PaiementService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get the connected user's CIN
    const currentUser = this.authService.currentUserSubject.getValue();
    const connectedCin = currentUser?.cin;

    // Call the global method to retrieve all payments
    this.paiementService.getPaiements().subscribe({
      next: (data: Paiement[]) => {
        // Filter only the payments belonging to the connected user
        const userPaiements = data.filter(paiement => paiement.cin === connectedCin);
        this.paiements = userPaiements;
        // Separate payments using type guards
        this.paiementsEnLigne = userPaiements.filter(this.isPaiementEnLigne);
        this.paiementsSurPlace = userPaiements.filter(this.isPaiementSurPlace);
        this.isLoading = false;
      },
      error: error => {
        this.errorMessage = 'Error loading payments. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  // Type guard for PaiementEnLigne
  isPaiementEnLigne(paiement: Paiement): paiement is PaiementEnLigne {
    return (paiement as PaiementEnLigne).paymentMethodNonce !== undefined;
  }

  // Type guard for PaiementSurPlace
  isPaiementSurPlace(paiement: Paiement): paiement is PaiementSurPlace {
    return (paiement as PaiementSurPlace).agence !== undefined;
  }
  }


