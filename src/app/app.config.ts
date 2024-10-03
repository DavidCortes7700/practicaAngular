import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { timeInterceptor } from './interceptors/time.interceptor';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { ErrorResponseInterceptor } from './interceptors/error-response.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideClientHydration(),
              provideHttpClient(withFetch(), withInterceptors([ErrorResponseInterceptor])),
              {
                provide:HTTP_INTERCEPTORS ,
                useValue: timeInterceptor,
                multi: true
              },
              {
                provide:HTTP_INTERCEPTORS ,
                useValue: tokenInterceptor,
                multi: true
              }
            ],
};
