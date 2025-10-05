import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Modal } from '@components/modal/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditorService } from '@services/splatfest/editor';

@Component({
  selector: 'app-nav-menu',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, Modal],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.scss'
})
export class NavMenu {
  #editorService = inject(EditorService);
  #router = inject(Router);

  isMenuOpen = signal(false);
  onLeaveConfirmation = signal(false);

  onSaveClick() {
    this.#editorService.downloadSplatfestFile();
  }

  onLeave(save: boolean) {
    if (save) this.#editorService.downloadSplatfestFile();

    this.onLeaveConfirmation.set(false);
    this.#editorService.closeEditor();
    this.#router.navigate(['/']);
  }

}
