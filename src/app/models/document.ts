export interface Document {
    id: number;
    type: string;
    chemin: string;
    dateAjout: string;
    taille: number;
    format: string;
    description?: string;
    proprietaire: string;  
    sinistreId: number;
    }