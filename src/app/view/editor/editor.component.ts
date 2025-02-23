import { Component } from '@angular/core';
import { EtcControllerComponent } from '../../components/editor-controllers/etc-controller/etc-controller.component';

@Component({
  selector: 'app-editor',
  imports: [EtcControllerComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {

}
