import { Injectable } from '@angular/core';
import { TeamColorTypes } from './team-color-types';
import tinycolor from 'tinycolor2';

@Injectable({
  providedIn: 'root'
})
export class AppColorService {
  setColorShades(teamType: TeamColorTypes, baseColor: string): void {
    const root = document.documentElement;
    const color = tinycolor(baseColor);
    const shades = this.generateShades(color);

    Object.entries(shades).forEach(([shade, value]) => {
      root.style.setProperty(`--color-${teamType}-${shade}`, value);
    });
  }

  private generateShades(color: tinycolor.Instance): { [key: string]: string } {
    const shades: { [key: string]: string } = {};
    const hsl = color.toHsl(); 

    const hue = hsl.h;
    const saturation = hsl.s;

    shades['50'] = this.toHex(hue, saturation, 0.95);  
    shades['100'] = this.toHex(hue, saturation, 0.85); 
    shades['200'] = this.toHex(hue, saturation, 0.75);  
    shades['300'] = this.toHex(hue, saturation, 0.65); 
    shades['400'] = this.toHex(hue, saturation, 0.55); 
    shades['500'] = this.toHex(hue, saturation, 0.45);  
    shades['600'] = this.toHex(hue, saturation, 0.35);  
    shades['700'] = this.toHex(hue, saturation, 0.25);  
    shades['800'] = this.toHex(hue, saturation, 0.15);  
    shades['900'] = this.toHex(hue, saturation, 0.05);  
    shades['950'] = this.toHex(hue, saturation, 0.02);  

    return shades;
  }


  private toHex(h: number, s: number, l: number): string {
    return tinycolor({ h, s, l }).toHexString();
  }
}
