export interface Prevoyance {
    id: number;
    dateEffet: Date;
    dateNaissance: Date;
    duree: number;
    frequenceReglement: string;
    capitalDeces: number;
    decesAccidentel: number | null;
    invaliditePP: number | null;
    incapaciteTemp: boolean;
    franchise: string;
    nom: string;
    prenom: string;
    mail: string;
    telephone: string;
  }