import { Component, OnInit } from '@angular/core';
import { PaiementService } from '../../servs/paiement.service';
import { Paiement, PaiementSurPlace, PaiementEnLigne } from '../../servs/paiement.model';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {

  paiements: Paiement[] = [];
  paiementsEnLigne: PaiementEnLigne[] = [];
  paiementsSurPlace: PaiementSurPlace[] = [];

  // Variables pour contrôler la visibilité des paiements
  paiementsEnLigneVisible: boolean = false;
  paiementsSurPlaceVisible: boolean = false;

  constructor(private paiementService: PaiementService) { }

  ngOnInit(): void {
    this.getAllPaiements();
    this.getPaiementsEnLigne();
    this.getPaiementsSurPlace();
  }

  // Récupérer tous les paiements
  getAllPaiements(): void {
    this.paiementService.getPaiements().subscribe(data => {
      this.paiements = data;
    });
  }

  // Récupérer les paiements en ligne
  getPaiementsEnLigne(): void {
    this.paiementService.getPaiementsEnLigne().subscribe(data => {
      this.paiementsEnLigne = data;
    });
  }

  // Récupérer les paiements sur place
  getPaiementsSurPlace(): void {
    this.paiementService.getPaiementsSurPlace().subscribe(data => {
      this.paiementsSurPlace = data;
    });
  }

  // Supprimer un paiement
  // Supprimer un paiement
  deletePaiement(id: number): void {
    this.paiementService.deletePaiement(id).subscribe({
      next: () => {
        alert('Paiement supprimé avec succès');
        // Rafraîchir les listes sans recharger toute la page
        this.getAllPaiements();
        this.getPaiementsEnLigne();
        this.getPaiementsSurPlace();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du paiement:', err);
        alert('Une erreur s\'est produite lors de la suppression.');
      }
    });
  }


  // Méthodes pour afficher/masquer les paiements en ligne et sur place
  togglePaiementsEnLigne(): void {
    this.paiementsEnLigneVisible = !this.paiementsEnLigneVisible;
  }

  togglePaiementsSurPlace(): void {
    this.paiementsSurPlaceVisible = !this.paiementsSurPlaceVisible;
  }


}
