import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
    providers: [{ provide: Window, useValue: window }],
};
