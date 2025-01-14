import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
export const appConfig: ApplicationConfig = {
 /* providers: [
    provideAnimations(),
    provideToastr({
      timeOut:1500, 
      preventDuplicates: true,
       positionClass: 'toast-bottom-right'}),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
        provideClientHydration(withEventReplay()),
        provideHttpClient(withFetch())  
    ]
        */

 providers: [
    provideAnimations(),
    provideToastr({
      timeOut:2000, 
      preventDuplicates: true,
       
       positionClass: 'toast-top-center'}),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
        provideClientHydration(withEventReplay()),
        provideHttpClient(withFetch())  
    ]
        

};
