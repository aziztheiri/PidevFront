import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-description-modal',
  templateUrl: './description-modal.component.html',
  styleUrls: ['./description-modal.component.scss']
})
export class DescriptionModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DescriptionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { description: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
