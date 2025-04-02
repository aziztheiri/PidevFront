import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string = 'Succès') {
    this.toastr.success(message, title);
  }

  showError(message: string, title: string = 'Erreur') {
    this.toastr.error(message, title);
  }

  showInfo(message: string, title: string = 'Info') {
    this.toastr.info(message, title);
  }

  showWarning(message: string, title: string = 'Attention') {
    this.toastr.warning(message, title);
  }
}