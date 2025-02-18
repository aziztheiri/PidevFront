import { Component, OnInit } from '@angular/core';
import { PaiementService } from '../../../admin/servs/paiement.service';
import { Paiement, PaiementSurPlace, PaiementEnLigne } from '../../../admin/servs/paiement.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// @ts-ignore
import creditCardType from 'credit-card-type';
@Component({
  selector: 'app-paiementfront',
  templateUrl: './paiementfront.component.html',
  styleUrls: ['./paiementfront.component.scss']
})
export class PaiementfrontComponent implements OnInit {
  paiements: Paiement[] = [];
  paiementsEnLigne: PaiementEnLigne[] = [];
  paiementsSurPlace: PaiementSurPlace[] = [];
  paiementForm!: FormGroup;
  cardType: string = '';

  constructor(private paiementService: PaiementService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllPaiements();
    this.getPaiementsEnLigne();
    this.getPaiementsSurPlace();
    this.initForm();
    const currentDateTime = new Date().toISOString(); // Format ISO 8601 : "YYYY-MM-DDTHH:MM:SS.sssZ"
    this.paiementForm.patchValue({
      date_paiement: currentDateTime
    });
  }

  initForm(): void {
    this.paiementForm = this.fb.group({
      montant: ['', [Validators.required, Validators.min(1)]],
      type: ['en ligne', Validators.required],
      date_paiement: ['', Validators.required],
      numeroCarte: ['', [Validators.pattern(/^\d{16}$/)]],
      expiration: ['', [Validators.required /*this.expirationValidator*/]],
      cvv: ['', [Validators.pattern(/^\d{3,4}$/)]],
      agence: [''],
      date_rdv: ['']
    });

    this.paiementForm.get('type')?.valueChanges.subscribe(value => {
      if (value === 'en ligne') {
        this.paiementForm.get('numeroCarte')?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
        this.paiementForm.get('expiration')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
        this.paiementForm.get('cvv')?.setValidators([Validators.required, Validators.pattern(/^\d{3,4}$/)]);
      } else {
        this.paiementForm.get('agence')?.setValidators([Validators.required]);
        this.paiementForm.get('date_rdv')?.setValidators([Validators.required]);
      }
      this.paiementForm.get('numeroCarte')?.updateValueAndValidity();
      this.paiementForm.get('expiration')?.updateValueAndValidity();
      this.paiementForm.get('cvv')?.updateValueAndValidity();
      this.paiementForm.get('agence')?.updateValueAndValidity();
      this.paiementForm.get('date_rdv')?.updateValueAndValidity();
    });
  }

  expirationValidator(control: any) {
    const value = control.value;
    if (value) {
      const currentDate = new Date();
      const [year, month] = value.split('-'); // On extrait l'année et le mois
      const expirationDate = new Date(Number(year), Number(month) - 1); // Date (année, mois)

      if (expirationDate < currentDate) {
        return { expired: true }; // Retourner une erreur si la date est dans le passé
      }
    }
    return null; // Aucun problème
  }


  onCardNumberChange(): void {
    const cardNumber = this.paiementForm.value.numeroCarte;
    const cardData = creditCardType(cardNumber);  // Utilisation de la librairie credit-card-type

    if (cardData.length > 0) {
      this.cardType = cardData[0].type;  // Le premier type trouvé
    } else {
      this.cardType = '';  // Carte inconnue
    }
  }

  addPaiement(): void {
    if (this.paiementForm.invalid) return;

    const typePaiement = this.paiementForm.value.type;
    let newPaiement: Paiement;

    // Récupérer la date d'expiration et la formater en MM/YYYY
    const expiration = this.paiementForm.value.expiration;
    const [year, month] = expiration.split('-');
    const formattedExpiration = `${month}/${year}`;

    if (typePaiement === 'en ligne') {
      newPaiement = {
        montant: this.paiementForm.value.montant,
        date_paiement: this.paiementForm.value.date_paiement,
        numeroCarte: this.paiementForm.value.numeroCarte,
        expiration: formattedExpiration,  // Utilisation du format MM/YYYY
        cvv: this.paiementForm.value.cvv
      } as PaiementEnLigne;
    } else {
      newPaiement = {
        montant: this.paiementForm.value.montant,
        date_paiement: this.paiementForm.value.date_paiement,
        agence: this.paiementForm.value.agence,
        date_rdv: this.paiementForm.value.date_rdv
      } as PaiementSurPlace;
    }

    this.paiementService.addPaiement(newPaiement).subscribe(response => {
      if (typePaiement === 'en ligne') {
        this.paiementsEnLigne.push(response as PaiementEnLigne);
      } else {
        this.paiementsSurPlace.push(response as PaiementSurPlace);
      }
      this.paiementForm.reset({ type: 'en ligne' });
    });
  }

  getAllPaiements(): void {
    this.paiementService.getPaiements().subscribe(data => {
      this.paiements = data;
    });
  }

  getPaiementsEnLigne(): void {
    this.paiementService.getPaiementsEnLigne().subscribe(data => {
      this.paiementsEnLigne = data;
    });
  }

  getPaiementsSurPlace(): void {
    this.paiementService.getPaiementsSurPlace().subscribe(data => {
      this.paiementsSurPlace = data;
    });
  }
}
