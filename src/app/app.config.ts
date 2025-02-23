import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { routes } from './app.routes';

const iconLibrary = new FaIconLibrary();
iconLibrary.addIconPacks(fas, )

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    { provide: FaIconLibrary, useValue: iconLibrary }
  ]
};
