import { CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, computed, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditorService } from '@services/splatfest/editor';
import { SplatfestRules } from 'src/app/common/types/splatfest/splatfest-model';

@Component({
  selector: 'app-general',
  imports: [FontAwesomeModule, CdkDropList, CdkDrag, CdkDragPlaceholder],
  templateUrl: './general.html',
  styleUrl: './general.scss'
})
export class General {
  #editorService = inject(EditorService);
  #etcParams = this.#editorService.festEtcParams;
  
  
  splatfestId = computed(() => this.#etcParams()?.FestivalId);
  version = computed(() => this.#etcParams()?.Version);
  battleResultRate = computed(() => this.#etcParams()?.BattleResultRate);
  lowPopulation = computed(() => this.#etcParams()?.LowPopulationNotJP ?? true);
  separateMatchmaking = computed(() => this.#etcParams()?.SeparateMatchingJP ?? false);

  availableRules = SplatfestRules;
  regularStages = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
  ];

  festRotation = this.#editorService.festRotation;


  onSplatfestIdChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);

    const defaultValue = this.#etcParams()?.FestivalId ?? 1000;

    if (!this.#validateNumber(value, 1000, 9999)) {
      input.value = String(defaultValue);
      return;
    }

    this.#etcParams.update((etcParams) => 
      !etcParams
      ? etcParams
      : ({
        ...etcParams,
        FestivalId: value
      })
    )

    input.value = String(value);
  }

  onVersionChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);

    const defaultValue = this.#etcParams()?.Version ?? 0;

    if (!this.#validateNumber(value, 1, 9)) {
      input.value = String(defaultValue);
      return;
    }

    this.#etcParams.update((etcParams) => 
      !etcParams
      ? etcParams
      : ({
        ...etcParams,
        Version: value
      })
    )

    input.value = String(value);
  }

  onBattleResultRateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);

    const defaultValue = this.#etcParams()?.BattleResultRate ?? 0;

    if (!this.#validateNumber(value, 1, 9)) {
      input.value = String(defaultValue);
      return;
    }

    this.#etcParams.update((etcParams) => 
      !etcParams
      ? etcParams
      : ({
        ...etcParams,
        BattleResultRate: value
      })
    )

    input.value = String(value);
  }

  onMatchmakingParamChange(event: Event, key: 'LowPopulationNotJP' | 'SeparateMatchingJP') {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;

    this.#etcParams.update((etcParams) => 
      !etcParams
      ? etcParams
      : ({
        ...etcParams,
        [key]: checked
      })
    )


    console.log(checked)
  }

  onRuleChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as SplatfestRules;
    this.festRotation.update((rotation) => {
      if (!rotation) return rotation;

      return {
        ...rotation,
        Rule: value
      }
    })
  }

  onStageMove(event: CdkDragDrop<string[]>) {
    this.festRotation.update((rotation) => {
      if (!rotation) return rotation;

      const stages = rotation.Stages;

      moveItemInArray(stages, event.previousIndex, event.currentIndex);

      return { ...rotation };
    })
  }

  onAddStageClick() { 
    // to be implemented
  };

  onRemoveStage(index: number) {
    this.festRotation.update((rotation) => {
      if (!rotation) return rotation;

      const newStages = rotation.Stages.filter((_, i) => i !== index);

      return {
        ...rotation,
        Stages: newStages
      }
    })
  }

  #validateNumber(valueStr: string | number, min?: number, max?: number): boolean {
    const value = typeof valueStr === 'string' ? parseFloat(valueStr) : valueStr;

    if (isNaN(value)) return false;

    if (min && value < min) return false;
    if (max && value > max) return false;
    return true; 
  }

  stageSlotRange(n: number) {
    return [...Array(n).keys()];
  }
}
