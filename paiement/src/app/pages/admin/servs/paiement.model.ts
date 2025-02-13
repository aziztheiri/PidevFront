// src/app/admin/paiement.model.ts

export interface Paiement {
  id_p: number;
  montant: number;
  date_paiement: string;  // Utilise une chaîne ISO pour la date
}

export interface PaiementSurPlace extends Paiement {
  agence: string;
  date_rdv: string;
}

export interface PaiementEnLigne extends Paiement {
  numeroCarte: string;
  cvv: string;
  expiration: string;
}
