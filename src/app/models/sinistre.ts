export interface Sinistre {
  id: number;
  dateDeclaration: Date;  // Change from string to Date
  description: string;
  statut: string;
  montantEstime: number;
  lieu: string;
  typeSinistre: string;
  responsabilite: string;
  dateCloture: Date | null;  // Change from string to Date | null
  telephone: string;
}
