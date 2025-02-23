import { Component, computed, forwardRef, input, model, OnChanges, signal, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TeamColorTypes } from '../../services/app-color/team-color-types';

export const CUSTOM_CONROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => ToggleComponent),
	multi: true,
};

@Component({
	selector: 'app-toggle',
	imports: [],
	templateUrl: './toggle.component.html',
	styleUrl: './toggle.component.scss',
	providers: [CUSTOM_CONROL_VALUE_ACCESSOR]
})
export class ToggleComponent implements ControlValueAccessor {
	protected _isChecked: boolean = false;
	protected teamColorResult = computed<string | null>(() => this.getTeamColor(this.teamColor()));
	
	disabled = model(false);
	teamColor = input<TeamColorTypes | null>(null);


	onChanged: Function = () => { };
	onTouched: Function = () => { };

	getTeamColor(teamColor: TeamColorTypes | null): string | null {
		if (!teamColor) {
			return '--color-dt-accent-500';
		}

		switch (teamColor) {
			case TeamColorTypes.TeamNeutral:
				return '--color-team-neutral-500'
			case TeamColorTypes.TeamAlpha: 
				return '--color-team-alpha-500'
			case TeamColorTypes.TeamBravo:
				return '--color-team-bravo-500'
		};
	}

	protected toggle() {
		this._isChecked = !this._isChecked;
		this.onChanged(this._isChecked);
		this.onTouched();
	}


	registerOnChange(fn: Function): void {
		this.onChanged = fn;
	}

	registerOnTouched(fn: Function): void {
		this.onTouched = fn;
	}

	writeValue(obj: any): void {
		
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}
}
