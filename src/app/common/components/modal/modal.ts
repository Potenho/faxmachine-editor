import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal {
  modalOpen = model.required<boolean>();
  bgColor = input<string>('bg-violet-600');
  cardRotationClass = input<string>('rotate-2')
  closeOnOverlayClick = input(true);

  onOverlayClick() {
    if (this.closeOnOverlayClick()) {
      this.modalOpen.set(false);
    }
  }
}