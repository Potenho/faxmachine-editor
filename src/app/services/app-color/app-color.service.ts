import { Injectable } from '@angular/core';
import { TeamColorTypes } from './team-color-types';
import tinycolor from 'tinycolor2';

@Injectable({
  providedIn: 'root'
})
export class AppColorService {

  /**
   * Converts splatfest file colors into hex colors
   * 
   * @param color - The color to be converted
   * @returns - Color in hex.
   */
  splatfestFileColorToHex(color: string): string {
    const channelsArray = color.split(',');

    if (channelsArray.length !== 4) {
      return '#ff0000'
    }

    const r = Number(channelsArray[0])
    const g = Number(channelsArray[1])
    const b = Number(channelsArray[2])

    let rFF = Math.round(r * 255);
    let gFF = Math.round(g * 255);
    let bFF = Math.round(b * 255);

    if (rFF > 255) { rFF = 255 }
    if (gFF > 255) { gFF = 255 }
    if (bFF > 255) { bFF = 255 }

    const hex = ((rFF << 16) | (gFF << 8) | bFF).toString(16).padStart(6, '0');

    return `#${hex}`
  }


  /**
   * Sets the given color to a given team in the whole app.
   * 
   * @param teamType - The team target
   * @param baseColor - The color to use
   */
  setTeamColorShades(teamType: TeamColorTypes, baseColor: string): void {
    const root = document.documentElement;
    const color = tinycolor(baseColor);
    const shades = this._generateShades(color);

    Object.entries(shades).forEach(([shade, value]) => {
      root.style.setProperty(`--color-${teamType}-${shade}`, value);
    });
  }


  /**
   * Generates the shades of a given color
   * 
   * @param color - The color target as a tinycolor instance
   * @returns - The shades in an object
   */
  private _generateShades(color: tinycolor.Instance): { [key: string]: string } {
    const shades: { [key: string]: string } = {};
    const hsl = color.toHsl();

    const hue = hsl.h;
    const saturation = hsl.s;

    shades['50'] = this._toHex(hue, saturation, 0.95);
    shades['100'] = this._toHex(hue, saturation, 0.85);
    shades['200'] = this._toHex(hue, saturation, 0.75);
    shades['300'] = this._toHex(hue, saturation, 0.65);
    shades['400'] = this._toHex(hue, saturation, 0.55);
    shades['500'] = this._toHex(hue, saturation, 0.45);
    shades['600'] = this._toHex(hue, saturation, 0.35);
    shades['700'] = this._toHex(hue, saturation, 0.25);
    shades['800'] = this._toHex(hue, saturation, 0.15);
    shades['900'] = this._toHex(hue, saturation, 0.05);
    shades['950'] = this._toHex(hue, saturation, 0.02);

    return shades;
  }


  /**
   * Converts HSL to HEX
   * @returns - the hex color
   */
  private _toHex(h: number, s: number, l: number): string {
    return tinycolor({ h, s, l }).toHexString();
  }
}
