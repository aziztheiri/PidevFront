import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SinistreService } from 'src/app/services/sinistres/sinistre.service';

@Component({
  selector: 'app-sinistre-detail',
  templateUrl: './sinistre-detail.component.html',
 // styleUrls: ['./sinistre-detail.component.css']
})
export class SinistreDetailComponent implements OnInit {
  sinistre: any;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private sinistreService: SinistreService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // récupère l'ID du paramètre 'id' dans l'URL
    this.loadSinistreDetails(id);
  }

  loadSinistreDetails(id: number): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.sinistreService.getSinistreById(id).subscribe(
      (data) => {
        this.sinistre = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des détails du sinistre.';
        this.isLoading = false;
      }
    );
  }
}