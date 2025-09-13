import { Component, inject } from '@angular/core';
import { EditorService } from '../../services/splatfest/editor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {
  #editorService = inject(EditorService);
  #router = inject(Router);

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    const file = input.files?.[0];
    
    if (!file) {
      return;
    }

    await this.#editorService.initializeEditor(file);
    this.#router.navigate(['/editor']);
  }
}
