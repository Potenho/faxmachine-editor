import { Component, inject, signal } from '@angular/core';
import { EditorService } from '../../services/splatfest/editor';
import { Router } from '@angular/router';
import { Modal } from "../../common/components/modal/modal";

@Component({
  selector: 'app-main',
  imports: [Modal],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {
  #editorService = inject(EditorService);
  #router = inject(Router);

  hasError = signal(false);

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    const file = input.files?.[0];
    
    if (!file) {
      return;
    }
    try {
      await this.#editorService.initializeFromFile(file);
      this.#router.navigate(['/editor']);
    } catch(e) {
      console.error('[ Main ]', e);
      this.hasError.set(true);
      console.log(this.hasError());

      input.value = '';
    }

  }

  async onTemplateSelect() {
    await this.#editorService.initializeFromTemplate();
    this.#router.navigate(['/editor']);
  }
}
