import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WinnerModalComponent } from './winner-modal.component';

@NgModule({
  declarations: [WinnerModalComponent],
  imports: [CommonModule],
  exports: [WinnerModalComponent],
})
export class WinnerModalModule {}
