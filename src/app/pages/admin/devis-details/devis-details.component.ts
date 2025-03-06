import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DevisService } from '../../../services/devis.service';
import { EcoleService } from '../../../services/ecole.service';
import { VoyageService } from '../../../services/voyage.service';
import { HabitationService } from '../../../services/habitation.service';
import { AccidentsService } from '../../../services/accidents.service';
import { CapitalisationService } from '../../../services/capitalisation.service';
import { PrevoyanceService } from '../../../services/prevoyance.service';
import { SanteInternationaleService } from '../../../services/sante-internationale.service';
import { Devis } from '../../../models/devis.model';
import { Ecole } from '../../../models/ecole.model';
import { Voyage } from '../../../models/voyage.model';
import { Habitation } from '../../../models/habitation.model';
import { Accidents } from '../../../models/accidents.model';
import { Capitalisation } from '../../../models/capitalisation.model';
import { Prevoyance } from '../../../models/prevoyance.model';
import { SanteInternationale } from '../../../models/santeinternationale.model';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-devis-details',
  templateUrl: './devis-details.component.html',
  styleUrls: ['./devis-details.component.scss'],
})
export class DevisDetailsComponent implements OnInit {
  devis: Devis | null = null; // Initialize as null
  assuranceDetails: any; // Holds details of the specific assurance type

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private devisService: DevisService,
    private ecoleService: EcoleService,
    private voyageService: VoyageService,
    private habitationService: HabitationService,
    private accidentsService: AccidentsService,
    private capitalisationService: CapitalisationService,
    private prevoyanceService: PrevoyanceService,
    private santeInternationaleService: SanteInternationaleService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.devisService.getDevisById(+id).subscribe((devis: Devis) => {
        this.devis = devis;
        if (devis.idAssurance) {
          this.fetchAssuranceDetails(devis.typeAssurance, devis.idAssurance);
        }
      });
    }
  }

  fetchAssuranceDetails(typeAssurance: string, idAssurance: number): void {
    switch (typeAssurance) {
      case 'ECOLE':
        this.ecoleService.getEcoleById(idAssurance).subscribe((data: Ecole) => {
          this.assuranceDetails = data;
        });
        break;
      case 'VOYAGE':
        this.voyageService.getVoyageById(idAssurance).subscribe((data: Voyage) => {
          this.assuranceDetails = data;
        });
        break;
      case 'HABITATION':
        this.habitationService.getHabitationById(idAssurance).subscribe((data: Habitation) => {
          this.assuranceDetails = data;
        });
        break;
      case 'ACCIDENTS':
        this.accidentsService.getAccidentById(idAssurance).subscribe((data: Accidents) => {
          this.assuranceDetails = data;
        });
        break;
      case 'CAPITALISATION':
        this.capitalisationService.getCapitalisationById(idAssurance).subscribe((data: Capitalisation) => {
          this.assuranceDetails = data;
        });
        break;
      case 'PREVOYANCE':
        this.prevoyanceService.getPrevoyanceById(idAssurance).subscribe((data: Prevoyance) => {
          this.assuranceDetails = data;
        });
        break;
      case 'SANTE_INTERNATIONALE':
        this.santeInternationaleService.getSanteInternationaleById(idAssurance).subscribe((data: SanteInternationale) => {
          this.assuranceDetails = data;
        });
        break;
      default:
        console.error('Unknown assurance type:', typeAssurance);
    }
  }

  formatId(id: number | undefined): string {
    if (!id) {
      return 'REF00'; // Default value if id is undefined
    }
    if (id < 100) {
      return `REF${String(id).padStart(2, '0')}`;
    } else {
      return `REF${id}`;
    }
  }

  // Quitter Button: Redirect to the devis component
  quitter(): void {
    this.router.navigate(['/admin/devis']);
  }

// Accepter ce devis Button
accepterDevis(): void {
  if (this.devis && this.devis.id) {
    this.devisService.updateDevisStatus(this.devis.id, 'ACCEPTE').subscribe(() => {
      this.reloadCurrentRoute(); // Refresh the current page
    });
  }
}

// Refuser ce devis Button
refuserDevis(): void {
  if (this.devis && this.devis.id) {
    this.devisService.updateDevisStatus(this.devis.id, 'REFUSE').subscribe(() => {
      this.reloadCurrentRoute(); // Refresh the current page
    });
  }
}

// Helper method to reload the current route
reloadCurrentRoute(): void {
  const currentUrl = this.router.url; // Get the current URL
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]); // Navigate to the current URL to refresh the page
  });
}

// Method to save the page as PDF
saveAsPdf(): void {
  const element = document.querySelector('.page-wrapper') as HTMLElement; // Select the element to be converted to PDF

  if (element) {
    // Hide the buttons section
    const buttonsSection = document.querySelector('.buttons-section') as HTMLElement;
    if (buttonsSection) {
      buttonsSection.style.display = 'none'; // Hide the buttons
    }

    // Generate the PDF
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png'); // Convert the canvas to an image
      const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF document
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate the height based on the aspect ratio

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight); // Add the image to the PDF
      pdf.save('devis-details.pdf'); // Save the PDF with a filename

      // Restore the buttons section after generating the PDF
      if (buttonsSection) {
        buttonsSection.style.display = 'flex'; // Restore the original display style
      }
    });
  }
}
}