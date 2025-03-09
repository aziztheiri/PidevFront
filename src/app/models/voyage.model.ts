export interface Voyage {
    id?: number;
    dureeContrat: string;
    dateDepart: Date;
    dateRetour: Date;
    pays: string;
    nationalite: string;
    trancheAge: string; 
    dateDebutContrat?: Date;
    dateFinContrat?: Date;
  }