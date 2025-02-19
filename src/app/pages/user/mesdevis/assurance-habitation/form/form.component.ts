import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  currentStep: number = 1;
  selectedPack: string = '';
  specificities: any[] = []; // Replace with your specificities data
  displayedColumns: string[] = ['name', 'description'];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.selectedPack = this.route.snapshot.paramMap.get('pack') || '';
    this.loadSpecificities();
  }

  loadSpecificities() {
    // Load specificities based on the selected pack
    // Example data, replace with actual data
    this.specificities = [
      { name: 'Spécificité 1', description: 'Description 1' },
      { name: 'Spécificité 2', description: 'Description 2' },
      { name: 'Spécificité 3', description: 'Description 3' },
    ];
  }

  nextStep() {
    this.currentStep++;
  }

  submitForm() {
    // Handle form submission logic
    console.log('Form submitted for pack:', this.selectedPack);
  }
}