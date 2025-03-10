import { Component, OnInit } from '@angular/core';
import { PaiementService } from '../../servs/paiement.service';
import { Paiement, PaiementSurPlace, PaiementEnLigne } from '../../servs/paiement.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {

  paiements: Paiement[] = [];
  paiementsEnLigne: PaiementEnLigne[] = [];
  paiementsSurPlace: PaiementSurPlace[] = [];

  paiementsEnLigneVisible: boolean = false;
  paiementsSurPlaceVisible: boolean = false;

  filtres = {
    montantMin: null as number | null,
    date: null as string | null,
    agence: null as string | null
  };

  paiementsEnLigneFiltres: PaiementEnLigne[] = [];
  paiementsSurPlaceFiltres: PaiementSurPlace[] = [];

  constructor(private paiementService: PaiementService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllPaiements();
    this.getPaiementsEnLigne();
    this.getPaiementsSurPlace();
  }


  getAllPaiements(): void {
    this.paiementService.getPaiements().subscribe(data => {
      this.paiements = data;
    });
  }


  getPaiementsEnLigne(): void {
    this.paiementService.getPaiementsEnLigne().subscribe(data => {
      this.paiementsEnLigne = data;
      this.paiementsEnLigneFiltres = data;
    });
  }


  getPaiementsSurPlace(): void {
    this.paiementService.getPaiementsSurPlace().subscribe(data => {
      this.paiementsSurPlace = data;
      this.paiementsSurPlaceFiltres = data; // Initialiser les paiements filtrés
    });
  }

  appliquerFiltres(): void {
    this.paiementsEnLigneFiltres = this.paiementsEnLigne.filter(paiement => {
      return (
          (!this.filtres.montantMin || paiement.montant >= this.filtres.montantMin) &&
          (!this.filtres.date || paiement.date_paiement === this.filtres.date)
      );
    });

    this.paiementsSurPlaceFiltres = this.paiementsSurPlace.filter(paiement => {
      return (
          (!this.filtres.montantMin || paiement.montant >= this.filtres.montantMin) &&
          (!this.filtres.date || paiement.date_paiement === this.filtres.date) &&
          (!this.filtres.agence || paiement.agence.includes(this.filtres.agence))
      );
    });
  }

  reinitialiserFiltres(): void {
    this.filtres = {
      montantMin: null,
      date: null,
      agence: null
    };
    this.paiementsEnLigneFiltres = this.paiementsEnLigne;
    this.paiementsSurPlaceFiltres = this.paiementsSurPlace;
  }

  deletePaiement(id: number): void {
    this.paiementService.deletePaiement(id).subscribe({
      next: () => {
        this.snackBar.open('Paiement supprimé avec succès', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.getAllPaiements();
        this.getPaiementsEnLigne();
        this.getPaiementsSurPlace();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du paiement:', err);
        this.snackBar.open('Une erreur s\'est produite lors de la suppression', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }


  togglePaiementsEnLigne(): void {
    this.paiementsEnLigneVisible = !this.paiementsEnLigneVisible;
  }

  togglePaiementsSurPlace(): void {
    this.paiementsSurPlaceVisible = !this.paiementsSurPlaceVisible;
  }


}
