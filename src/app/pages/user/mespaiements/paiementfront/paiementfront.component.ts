import { Component, OnInit } from '@angular/core';
import { PaiementService } from '../../../admin/servs/paiement.service';
import { Paiement, PaiementSurPlace, PaiementEnLigne } from '../../../admin/servs/paiement.model';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HammerGestureConfig } from '@angular/platform-browser';
// @ts-ignore
import { HammerInput } from 'hammerjs';
// @ts-ignore
import * as Payment from 'payment';
import { jsPDF } from 'jspdf';

import {faCreditCard, faHome, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-paiementfront',
  templateUrl: './paiementfront.component.html',
  styleUrls: ['./paiementfront.component.scss']
})

export class PaiementfrontComponent implements OnInit {
    showOnlineForm: boolean = true;
    faCreditCard = faCreditCard;
    faHome = faHome;
    paiements: Paiement[] = [];
    paiementsEnLigne: PaiementEnLigne[] = [];
    paiementsSurPlace: PaiementSurPlace[] = [];
    paiementEnLigneForm!: FormGroup;
    paiementSurPlaceForm!: FormGroup;
    mapVisible: boolean = false;
    primeTotale!:number;
    selectedAgence: string = '';
    agences = {
        "Grand Tunis": [{ name: "Agence 1", x: 150, y: 200 }, { name: "Agence 2", x: 300, y: 400 }],
        "Sousse": [{ name: "Agence 3", x: 120, y: 150 }],
        "Hammamet": [{ name: "Agence 4", x: 200, y: 250 }],
        "Ariana": [{ name: "Agence 5", x: 100, y: 100 }],
        "Manouba": [{ name: "Agence 6", x: 180, y: 300 }]
    };
    selectedRegion: string = "";
    markers: any[] = [];
    cardType: string = 'default';

    constructor(private paiementService: PaiementService, private fb: FormBuilder,private authService:AuthService,private router:Router) { }

    ngOnInit(): void {
        this.primeTotale = history.state.primeTotale;

        this.getAllPaiements();
        this.getPaiementsEnLigne();
        this.getPaiementsSurPlace();
        this.initForms();
    //   const navigation = this.router.getCurrentNavigation();
    //    this.primeTotale = navigation?.extras.state?.['primeTotale'];
        const currentDateTime = new Date().toISOString(); // Format : "YYYY-MM-DDTHH:MM:SS.sssZ"
        this.paiementEnLigneForm.patchValue({
            date_paiement: currentDateTime
        });
        this.paiementSurPlaceForm.patchValue({
            date_paiement: currentDateTime
        });
        this.paiementEnLigneForm.patchValue({
            id_p: 0
        });
        this.paiementSurPlaceForm.patchValue({
            id_p: 0
        });
    }

    initForms(): void {
        this.paiementEnLigneForm = this.fb.group({
            montant: [this.primeTotale, [Validators.required, Validators.min(1)]],
            date_paiement: ['', Validators.required],
            numeroCarte: ['', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]],
            expiration: ['', [Validators.required, this.expirationValidator]],
            cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
        });

        this.paiementSurPlaceForm = this.fb.group({
            montant: [this.primeTotale, [Validators.required, Validators.min(1)]],
            date_paiement: ['', Validators.required],
            agence: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s\-]+$/)]],
            date_rdv: ['', [Validators.required, this.dateRdvValidator]]
        });
    }

    openMap(): void {
        this.mapVisible = true;
    }

    closeMap() {
        this.mapVisible = false;
    }

    selectAgence(agence: string): void {
        this.selectedAgence = agence;
        this.mapVisible = false;
    }

    showRegion(region: string): void {
        this.selectedRegion = region;
        // @ts-ignore
        this.markers = this.agences[region];
    }

    onMarkerClick(agence: string): void {
        this.selectAgence(agence);
    }
    expirationValidator(control: AbstractControl) {
        const value = control.value;
        if (value) {
            const currentDate = new Date();
            const [year, month] = value.split('-').map(Number);
            const expirationDate = new Date(year, month - 1, 1);
            if (expirationDate < new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)) {
                return { expired: true };
            }
        }
        return null;
    }

    toggleForm() {
        this.showOnlineForm = !this.showOnlineForm;
    }

    dateRdvValidator(control: AbstractControl) {
        const value = control.value;
        if (value) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selectedDate = new Date(value);
            if (selectedDate <= today) {
                return { pastDate: true };
            }
        }
        return null;
    }

    getCardLogo(): string {
        const logos: { [key: string]: string } = {
            visa: 'assets/card-logos/visa.webp',
            mastercard: 'assets/card-logos/mastercard.png',
            amex: 'assets/card-logos/amex.png',
            discover: 'assets/card-logos/discover.png',
            diners: 'assets/card-logos/diners.png',
            jcb: 'assets/card-logos/jcb.png',
            default: 'assets/card-logos/default.jpg'
        };
        return logos[this.cardType] || logos['default'];
    }
    detectCardType(): void {
        const cardNumber = this.paiementEnLigneForm.get('numeroCarte')?.value;
        if (cardNumber) {
            this.cardType = Payment.fns.cardType(cardNumber) || 'default';
        } else {
            this.cardType = 'default';
        }
    }

    onSwipe(event: HammerInput) {
        if (event.deltaX > 0) {
            this.showOnlineForm = false;
        } else if (event.deltaX < 0) {
            this.showOnlineForm = true;
        }
    }


    addPaiementEnLigne(): void {
        if (this.paiementEnLigneForm.invalid) return;
        const currentUser = this.authService.currentUserSubject.getValue();

        const paiementData = this.paiementEnLigneForm.value;
        const expiration = paiementData.expiration;
        const [year, month] = expiration.split('-');
        const formattedExpiration = `${month}/${year}`;

        const newPaiement: PaiementEnLigne = {
            id_p: 0,
            montant: paiementData.montant,
            date_paiement: paiementData.date_paiement,
            numeroCarte: paiementData.numeroCarte,
            expiration: formattedExpiration,
            cvv: paiementData.cvv
        };

        this.paiementService.addPaiement(newPaiement).subscribe(response => {
            this.paiementsEnLigne.push(response as PaiementEnLigne);
            this.paiementEnLigneForm.reset();

            const emailData = {
                to_email: currentUser?.email,
                name: currentUser?.name,
                montant: paiementData.montant,
                numeroCarte: paiementData.numeroCarte,
                date_paiement: new Date().toLocaleString(),
            };
            this.paiementService.sendEmailConfirmationEnLigne(emailData);

            this.generatePDF(paiementData, true);
        });
    }

    addPaiementSurPlace(): void {
        if (this.paiementSurPlaceForm.invalid) return;
        const currentUser = this.authService.currentUserSubject.getValue();

        const paiementData = this.paiementSurPlaceForm.value;

        const newPaiement: PaiementSurPlace = {
            id_p: 0,
            montant: paiementData.montant,
            date_paiement: paiementData.date_paiement,
            agence: paiementData.agence,
            date_rdv: paiementData.date_rdv
        };

        this.paiementService.addPaiement(newPaiement).subscribe(response => {
            this.paiementsSurPlace.push(response as PaiementSurPlace);
            this.paiementSurPlaceForm.reset();


            const emailData = {
                to_email: currentUser?.email,
                name: currentUser?.name,
                montant: paiementData.montant,
                agence: paiementData.agence,
                date_rdv: paiementData.date_rdv,
            };
            this.paiementService.sendEmailConfirmationSurPlace(emailData);


            this.generatePDF(paiementData, false);
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

    generatePDF(paiementData: any, isEnLigne: boolean): void {
        const doc = new jsPDF();
        const date = new Date().toLocaleString();

        let text = `Confirmation de Paiement - ${date}\n\n`;

        if (isEnLigne) {
            text += `Paiement en ligne\n`;
            text += `Montant: ${this.primeTotale} TND\n`;
            text += `Numéro de carte: ${paiementData.numeroCarte}\n`;
            text += `Date d'expiration: ${paiementData.expiration}\n`;
            text += `CVV: ${paiementData.cvv}\n`;
            doc.text(text, 10, 10);
            doc.save('confirmation_paiement.pdf');
        } else {
            text += `Paiement sur place\n`;
            text += `Montant: ${this.primeTotale} TND\n`;
            text += `Agence: ${paiementData.agence}\n`;
            text += `Date de rendez-vous: ${paiementData.date_rdv}\n`;
            doc.text(text, 10, 10);
            doc.save('confirmation_rendez_vous.pdf');
        }


    }

    protected readonly faMapMarkerAlt = faMapMarkerAlt;
}

