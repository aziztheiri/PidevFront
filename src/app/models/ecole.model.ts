export interface Ecole {
    id?: number;
    role: string;
    typePiece: string; 
    numeroPiece: string;
    nom: string;
    prenom: string;
    numTelephone: string;
    email: string;
    matriculeFiscale: string;
    raisonSociale: string;
    secteurActivite: string;
    profession: string;
    activiteEtablissement: string;
    adresseEtablissement: string;
    villeEtablissement: string;
    codePostaleEtablissement: string;
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