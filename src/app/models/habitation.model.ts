export interface Habitation {
    id: number;
    pack: string; // Use string for enum in Angular
    idGarantiesAssocies: number[];
    typePersonne: string;
    typePiece: string; // Use string for enum in Angular
    numeroPiece: string;
    villePiece: string;
    datePiece: Date;
    civilité: string; // Use string for enum in Angular
    nom: string;
    prenom: string;
    dateNaissance: Date;
    secteurActivite: string;
    profession: string;
    matriculeFiscale: string;
    raisonSociale: string;
    registreCommerce: string;
    adresse: string;
    ville: string;
    codePostale: string;
    numTelephone: string;
    email: string;
    dateDebutContrat: Date;
    dateFinContrat: Date;
    adresseLogement: string;
    villeLogement: string;
    codePostaleLogement: string;
    numTelephoneLogement: string;
    emailLogement: string;
    photovoltaique: boolean;
  }