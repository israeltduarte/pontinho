import { Component } from '@angular/core';

@Component({
  selector: 'winner-modal',
  templateUrl: 'winner-modal.component.html',
  styleUrls: ['winner-modal.component.css'],
})
export class WinnerModalComponent {
  showModal: boolean = false;

  toggle() {
    this.showModal = !this.showModal;
  }
}
