export interface Devis {
    id?: number;
    montant: number;
    dateCalcul: Date;
    typeAssurance: string; // Use string for enum in Angular
    idAssurance: number;
    statut: string; // Use string for enum in Angular
    dateDebutContrat: Date;
    dateFinContrat: Date;
  }