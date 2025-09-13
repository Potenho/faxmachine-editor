import { Component, inject } from '@angular/core';
import { EditorService } from '../../services/splatfest/editor';
import { RouterOutlet } from '@angular/router';
import { NavMenu } from "./components/nav-menu/nav-menu";

@Component({
  selector: 'app-editor',
  imports: [RouterOutlet, NavMenu],
  templateUrl: './editor.html',
  styleUrl: './editor.scss'
})
export class Editor {
  #editorService = inject(EditorService);

  download() {
    this.#editorService.downloadSplatfestFile();
  }
}
