import { Component, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { EcoleService } from '../../../../../services/ecole.service';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component {
  @ViewChildren(MatDatepicker) datePickers!: QueryList<MatDatepicker<Date>>;

  step1Data: any;
  step2Data: any;
  children: { nom: string, prenom: string, dateNaissance: Date }[] = [];
  adresseParent: string = '';
  ville: string = '';
  codePostale: string = '';
  dateEffet: Date | null = null;

  constructor(private router: Router, private ecoleService: EcoleService) {
    const navigation = this.router.getCurrentNavigation();
    this.step1Data = navigation?.extras.state?.['step1Data'];
    this.step2Data = navigation?.extras.state?.['step2Data'];

    // Initialize children array based on the number of children
    if (this.step2Data?.numberOfChildren > 0) {
      this.children = Array(this.step2Data.numberOfChildren).fill({ nom: '', prenom: '', dateNaissance: new Date() });
    }
  }

  // Helper method to get the correct date picker reference
  getDatePickerRef(index: number): MatDatepicker<Date> {
    return this.datePickers.toArray()[index];
  }

  previousStep() {
    this.router.navigate(['/user/mesdevis/assurance-scolaire/step2'], { state: { step1Data: this.step1Data } });
  }

  validate() {
    if (this.isFormValid()) {
      const ecoleData = {
        ...this.step1Data,
        adresseParent: this.adresseParent,
        ville: this.ville,
        codePostale: this.codePostale,
        dateEffet: this.dateEffet,
        nomsEnfants: this.children.map(child => child.nom),
        prenomsEnfants: this.children.map(child => child.prenom),
        datesNaissanceEnfants: this.children.map(child => child.dateNaissance),
        pack: this.step2Data.selectedPack // Include the selected pack
      };

      this.ecoleService.createEcole(ecoleData).subscribe(
        (response) => {
          console.log('Ecole saved:', response);
          alert('Validation successful!');
          this.router.navigate(['/user/consulter-devis']);
        },
        (error) => {
          console.error('Error saving Ecole:', error);
        }
      );
    }
  }

  isFormValid(): boolean {
    return (
      this.adresseParent !== '' &&
      this.ville !== '' &&
      this.codePostale !== '' &&
      this.dateEffet !== null &&
      this.children.every(child => child.nom !== '' && child.prenom !== '' && child.dateNaissance !== null)
    );
  }
}