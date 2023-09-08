import { Component } from '@angular/core';

@Component({
  selector: 'configs-modal',
  templateUrl: 'configs-modal.component.html',
  styleUrls: ['configs-modal.component.css'],
})
export class ConfigsModalComponent {
  showModal: boolean = false;

  toggle() {
    this.showModal = !this.showModal;
  }
}
