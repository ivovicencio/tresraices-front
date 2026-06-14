import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions, RouteReuseStrategy } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { CacheLandingReuseStrategy } from './core/route-reuse-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withViewTransitions({
        onViewTransitionCreated: ({ transition }) => {
          transition.finished.finally(() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
          });
        },
      }),
    ),
    { provide: RouteReuseStrategy, useClass: CacheLandingReuseStrategy },
    provideHttpClient(),
  ],
};
