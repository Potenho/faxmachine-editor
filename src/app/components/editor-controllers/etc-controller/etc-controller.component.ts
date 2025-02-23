import { Component, inject } from '@angular/core';
import { ToggleComponent } from '../../toggle/toggle.component';
import { AppColorService } from '../../../services/app-color/app-color.service';
import { TeamColorTypes } from '../../../services/app-color/team-color-types';

@Component({
  selector: 'app-etc-controller',
  imports: [ToggleComponent],
  templateUrl: './etc-controller.component.html',
  styleUrl: './etc-controller.component.scss'
})
export class EtcControllerComponent {
  colorService = inject(AppColorService);
  protected TeamColorTypes = TeamColorTypes;

  onColorChange(event: Event) {
    const color = (event.target as HTMLInputElement).value;
    if (color === "#000000") {
      return;
    }
    console.log('aaaaa')
    this.colorService.setColorShades(TeamColorTypes.TeamNeutral, color);
  }
}
