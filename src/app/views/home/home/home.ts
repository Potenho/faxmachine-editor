import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from '@components/modal/modal';
import { environment } from '@env/environment';
import { EditorService } from '@services/splatfest/editor';

@Component({
  selector: 'app-home',
  imports: [Modal],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  #editorService = inject(EditorService);
  #router = inject(Router);

  appVersion = environment.version;

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
