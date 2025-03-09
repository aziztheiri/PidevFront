export interface Ecole {
  id?: number;
  role?: string | null;
  typePiece?: string | null; 
  numeroPiece?: string | null;
  nom?: string | null;
  prenom?: string | null;
  numTelephone?: string | null;
  email?: string | null;
  matriculeFiscale?: string | null;
  raisonSociale?: string | null;
  secteurActivite?: string | null;
  profession?: string | null;
  activiteEtablissement?: string | null;
  adresseEtablissement?: string | null;
  villeEtablissement?: string | null;
  codePostaleEtablissement?: string | null;
  nomsEnfants: string[];
  prenomsEnfants: string[];
  datesNaissanceEnfants: Date[];
  dateEffet: Date;
  pack: string; 
  adresseParent: string;
  ville: string;
  codePostale: string;
  dateDebutContrat: Date;
  dateFinContrat: Date;
}