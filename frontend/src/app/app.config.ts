import {ApplicationConfig, LOCALE_ID} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {en_GB, NZ_I18N} from "ng-zorro-antd/i18n";
import {httpMiddleware} from "./core/http-middleware";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([httpMiddleware])),
    provideAnimations(),
    {provide: NZ_I18N, useValue: en_GB},
    {provide: LOCALE_ID, useValue: 'en_GB'},
  ],
};
