import { Component, OnInit, ViewChild, ElementRef, OnDestroy  } from '@angular/core';
import { PaiementService } from '../../../admin/servs/paiement.service';
import { CreneauService } from '../../../admin/servs/crenau.service';
import { Agency } from '../../../admin/servs/agency.model';
import { Paiement, PaiementSurPlace, PaiementEnLigne } from '../../../admin/servs/paiement.model';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HammerGestureConfig } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
// @ts-ignore
import { HammerInput } from 'hammerjs';
// @ts-ignore
import * as Payment from 'payment';
import { jsPDF } from 'jspdf';
import * as braintree from 'braintree-web-drop-in';




import {faCreditCard, faHome, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-paiementfront',
  templateUrl: './paiementfront.component.html',
  styleUrls: ['./paiementfront.component.scss']
})

export class PaiementfrontComponent implements OnInit, OnDestroy  {

    @ViewChild('paymentForm') paymentFormRef!: ElementRef;
    braintreeInstance!: braintree.Dropin;

    paymentData = {
        montant: null,
        paymentMethodNonce: null as string | null
      };


    clientToken!: string;
  braintreeError: string | null = null;
    creneauxDisponibles: string[] = [];
    creneauSelectionne: string = '';
    dateSelectionnee: string = '';
  agenceDisponible: boolean = true;
    showOnlineForm: boolean = true;
    faCreditCard = faCreditCard;
    faHome = faHome;
    paiements: Paiement[] = [];
    paiementsEnLigne: PaiementEnLigne[] = [];
    paiementsSurPlace: PaiementSurPlace[] = [];
    paiementEnLigneForm!: FormGroup;
    paiementSurPlaceForm!: FormGroup;
    mapVisible: boolean = false;
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

    constructor(private paiementService: PaiementService, private fb: FormBuilder,private creneauService: CreneauService,private http: HttpClient) { }

 
    
    async ngOnInit(): Promise<void> {
        window.addEventListener('message', (event) => {
            if (event.data?.type === 'AGENCY_SELECTED') {
              this.selectedAgence = event.data.agency;
              this.creneauSelectionne = event.data.creneau;
              this.dateSelectionnee = event.data.date_rdv;
              
              this.paiementSurPlaceForm.patchValue({
                agence: event.data.agency,
                creneau: event.data.creneau,
                date_rdv: `${event.data.date_rdv}T${event.data.creneau}:00`
              });
            }
          });

          this.paiementService.getClientToken().subscribe(
            (response: string) => {
              // La réponse est maintenant une chaîne de caractères (clientToken)
              this.clientToken = response;  // Vous pouvez utiliser le token ici pour Braintree
              console.log('Client Token:', this.clientToken);
            },
            (error) => {
              console.error('Erreur lors de la récupération du client token:', error);
            }
          );
          




          
        this.getAllPaiements();
        this.getPaiementsEnLigne();
        this.getPaiementsSurPlace();
        this.initForms();
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


        try {
            const clientTokenResponse: any = await this.http.get('http://localhost:8080/paiements/enligne/token').toPromise();
            this.clientToken = clientTokenResponse.clientToken;
      
            if (this.clientToken) {
              this.initializeBraintreeDropin(this.clientToken);
            } else {
              this.braintreeError = 'Impossible de récupérer le token client Braintree.';
            }
          } catch (error) {
            this.braintreeError = 'Erreur lors de la récupération du token client Braintree.';
          }
        
    }

    async initializeBraintreeDropin(clientToken: string): Promise<void> {
        try {
          this.braintreeInstance = await braintree.create({
            authorization: clientToken,
            container: '#dropin-container',
            card: {
                overrides: {
                    styles: {
                        input: {
                            color: 'blue',
                            'font-size': '18px'
                        },
                        '.number': {
                            'font-family': 'monospace'  
                        },
                        '.invalid': {
                            color: 'red'
                        }
                    }
                }
            }
            
            
          });
        } catch (error) {
          this.braintreeError = 'Erreur lors de l\'initialisation du paiement.';
        }
      }
    
      ngOnDestroy(): void {
        if (this.braintreeInstance) {
          this.braintreeInstance.teardown();
        }
      }


      async submitPayment() {
        if (!this.braintreeInstance) {
          this.braintreeError = 'Le paiement n\'est pas initialisé.';
          return;
        }
    
        try {
          const payload = await this.braintreeInstance.requestPaymentMethod();
          this.paymentData.paymentMethodNonce = payload.nonce;
          this.sendPaymentDataToBackend();
        } catch (error) {
          this.braintreeError = 'Erreur lors de la récupération des informations de paiement.';
        }
      }


      async sendPaymentDataToBackend() {
        const dataToSend = {
          montant: this.paymentData.montant,
          paymentMethodNonce: this.paymentData.paymentMethodNonce
        };
    
        this.http.post('http://localhost:8080/paiements/enligne', dataToSend)
          .subscribe(
            (response) => {
              console.log('Informations de paiement sauvegardées avec le nonce:', response);
              // Gérer le succès
            },
            (error) => {
              console.error('Erreur lors de la sauvegarde du nonce:', error);
              // Gérer l'erreur
            }
          );
      }




    initForms(): void {
        this.paiementEnLigneForm = this.fb.group({
            montant: ['', [Validators.required, Validators.min(1)]],
            date_paiement: ['', Validators.required],
            
        });

        this.paiementSurPlaceForm = this.fb.group({
            montant: ['', [Validators.required, Validators.min(1)]],
            date_paiement: ['', Validators.required],
            agence: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s\-]+$/)]],
            date_rdv: ['', [Validators.required, this.dateRdvValidator]],
            creneau: ['', [Validators.required]]
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

    onDateOrAgenceChange(): void {
        const agence = this.paiementSurPlaceForm.get('agence')?.value;
        const date = this.paiementSurPlaceForm.get('date_rdv')?.value;
    
        if (agence && date) {
          this.creneauService.getCreneauxDisponibles(agence, date).subscribe({
            next: (creneaux: string[]) => {
              this.creneauxDisponibles = creneaux;
              this.updateCreneauValidation();
            },
            error: (err) => console.error('Erreur:', err)
          });
        }
      }

      private updateCreneauValidation(): void {
        const creneauControl = this.paiementSurPlaceForm.get('creneau');
        if (this.creneauxDisponibles.length === 0) {
          creneauControl?.setErrors({ noSlotsAvailable: true });
        } else {
          creneauControl?.setErrors(null);
        }
      }

      chargerCreneaux() {
        const dateControl = this.paiementSurPlaceForm.get('date_rdv');
        if (dateControl && dateControl.value) {
            // Stocke la date au format YYYY-MM-DD
            this.dateSelectionnee = new Date(dateControl.value).toISOString().split('T')[0];
            
            const agence = this.paiementSurPlaceForm.get('agence')?.value;
            if (agence) {
                this.creneauService.getCreneauxDisponibles(agence, this.dateSelectionnee)
                    .subscribe(creneaux => this.creneauxDisponibles = creneaux);
            }
        }
    }

    selectCreneau(creneau: string) {
        this.creneauSelectionne = creneau;
        
        // Mettre à jour le formulaire avec le créneau sélectionné
        this.paiementSurPlaceForm.patchValue({ 
            creneau: creneau
        });
        
        // Forcer la mise à jour du champ date_rdv avec la date sélectionnée
        const dateControl = this.paiementSurPlaceForm.get('date_rdv');
        if (dateControl) {
            dateControl.setValue(this.dateSelectionnee);
            dateControl.updateValueAndValidity();
        }
        
        // Si vous voulez forcer la validation
        this.paiementSurPlaceForm.get('creneau')?.updateValueAndValidity();
    }

    
    

    addPaiementSurPlace() {
        if (this.paiementSurPlaceForm.invalid) return;
    
        const formData = {
            ...this.paiementSurPlaceForm.value,
            // Combine la date et le créneau
            date_rdv: `${this.dateSelectionnee}T${this.creneauSelectionne}:00`
        };
    
        this.paiementService.ajouterPaiementSurPlace(formData).subscribe(
            response => console.log('Succès:', response),
            error => console.error('Erreur:', error)
        );
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
            text += `Montant: ${paiementData.montant} TND\n`;
            text += `Numéro de carte: ${paiementData.numeroCarte}\n`;
            text += `Date d'expiration: ${paiementData.expiration}\n`;
            text += `CVV: ${paiementData.cvv}\n`;
            doc.text(text, 10, 10);
            doc.save('confirmation_paiement.pdf');
        } else {
            text += `Paiement sur place\n`;
            text += `Montant: ${paiementData.montant} TND\n`;
            text += `Agence: ${paiementData.agence}\n`;
            text += `Date de rendez-vous: ${paiementData.date_rdv}\n`;
            doc.text(text, 10, 10);
            doc.save('confirmation_rendez_vous.pdf');
        }


    }

    async openMapInNewTab(): Promise<void> {
        try {
            const agencies = await this.paiementService.getAgencies().toPromise();
            const creneaux = this.generateTimeSlots(); // Génère les créneaux de 20 minutes
    
            const mapWindow = window.open('', '_blank');
            if (mapWindow) {
                // Échappement des données pour injection sécurisée
                const agenciesJson = JSON.stringify(agencies)
                    .replace(/</g, '\\u003c')
                    .replace(/'/g, "\\'");
                
                const creneauxJson = JSON.stringify(creneaux)
                    .replace(/</g, '\\u003c')
                    .replace(/'/g, "\\'");
    
                const today = new Date().toISOString().split('T')[0];
    
                mapWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Sélection d'agence et créneau</title>
                        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
                        <style>
                            body { margin: 0; padding: 0; }
                            #map { height: 100vh; width: 100%; }
                            
                            /* Style bouton orange */
                            .select-agency-btn {
                                background-color: rgb(230, 100, 14);
                                color: white;
                                border: none;
                                padding: 8px 16px;
                                margin-top: 10px;
                                cursor: pointer;
                                border-radius: 4px;
                                width: 100%;
                                font-size: 14px;
                            }
                            
                            /* Style créneaux */
                            .time-slot {
                                display: inline-block;
                                padding: 5px 10px;
                                margin: 3px;
                                background: #f1f1f1;
                                border-radius: 3px;
                                cursor: pointer;
                                font-size: 12px;
                            }
                            
                            .time-slot.selected {
                                background: rgb(230, 100, 14);
                                color: white;
                            }
                            
                            .time-slot.unavailable {
                                background: #e0e0e0;
                                color: #999;
                                cursor: not-allowed;
                            }
                            
                            .leaflet-popup-content {
                                min-width: 250px;
                                max-height: 300px;
                                overflow-y: auto;
                            }
                        </style>
                    </head>
                    <body>
                        <div id="map"></div>
                        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
                        <script>
                            const agencies = ${agenciesJson};
                            const allTimeSlots = ${creneauxJson};
                            const today = '${today}';
                            
                            // Initialisation carte
                            const map = L.map('map').setView([36.8, 10.25], 12);
                            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                            
                            // Fonction de sélection
                            function selectAgency(agencyName, timeSlot, date) {
                                window.opener.postMessage({
                                    type: 'AGENCY_SELECTED',
                                    agency: agencyName,
                                    creneau: timeSlot,
                                    date_rdv: date
                                }, '*');
                                window.close();
                            }
                            
                            // Ajout des marqueurs
                            agencies.forEach(agency => {
                                const marker = L.marker([agency.latitude, agency.longitude])
                                    .addTo(map)
                                    .bindPopup(
                                        '<div>' +
                                        '<h4 style="margin-bottom:10px">' + agency.name + '</h4>' +
                                        '<p style="margin-bottom:15px">' + agency.address + '</p>' +
                                        '<label>Date du rendez-vous:</label>' +
                                        '<input type="date" id="date-' + agency.id + '" min="' + today + '" ' +
                                        'style="width:100%;margin-bottom:10px" ' +
                                        'onchange="updateTimeSlots(' + agency.id + ', this.value)">' +
                                        '<div id="slots-' + agency.id + '" style="margin-bottom:10px"></div>' +
                                        '<button class="select-agency-btn" id="btn-' + agency.id + '" disabled ' +
                                        'onclick="confirmSelection(' + agency.id + ')">' +
                                        'Confirmer la sélection</button>' +
                                        '</div>'
                                    );
                            });
                            
                            // Fonctions globales
                            window.updateTimeSlots = function(agencyId, date) {
                                const slotsContainer = document.getElementById('slots-' + agencyId);
                                const confirmBtn = document.getElementById('btn-' + agencyId);
                                
                                slotsContainer.innerHTML = '';
                                confirmBtn.disabled = true;
                                
                                if (!date) return;
                                
                                // Simulation - remplacer par appel API réel
                                const reservedSlots = []; 
                                
                                allTimeSlots.forEach(slot => {
                                    const isReserved = reservedSlots.includes(slot);
                                    const slotElement = document.createElement('span');
                                    slotElement.className = 'time-slot' + 
                                        (isReserved ? ' unavailable' : '');
                                    slotElement.textContent = slot;
                                    
                                    if (!isReserved) {
                                        slotElement.onclick = function() {
                                            document.querySelectorAll('#slots-' + agencyId + ' .time-slot')
                                                .forEach(el => el.classList.remove('selected'));
                                            this.classList.add('selected');
                                            confirmBtn.disabled = false;
                                        };
                                    }
                                    
                                    slotsContainer.appendChild(slotElement);
                                });
                            };
                            
                            window.confirmSelection = function(agencyId) {
                                const agency = agencies.find(a => a.id == agencyId);
                                const date = document.getElementById('date-' + agencyId).value;
                                const selectedSlot = document.querySelector(
                                    '#slots-' + agencyId + ' .time-slot.selected'
                                )?.textContent;
                                
                                if (agency && date && selectedSlot) {
                                    selectAgency(agency.name, selectedSlot, date);
                                }
                            };
                            
                            // Ajustement de la vue
                            if (agencies.length > 0) {
                                const bounds = L.latLngBounds(
                                    agencies.map(a => [a.latitude, a.longitude])
                                );
                                map.fitBounds(bounds, { padding: [50, 50] });
                            }
                        </script>
                    </body>
                    </html>
                `);
                mapWindow.document.close();
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    }
    
    // Fonction pour générer les créneaux horaires
    private generateTimeSlots(): string[] {
        const slots = [];
        for (let hour = 8; hour < 18; hour++) { // De 8h à 17h
            for (let minute = 0; minute < 60; minute += 20) { // Toutes les 20 minutes
                slots.push(
                    `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
                );
            }
        }
        return slots;
    }

    protected readonly faMapMarkerAlt = faMapMarkerAlt;

    


















}

