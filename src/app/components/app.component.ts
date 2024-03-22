import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApplicationStateService } from '../services/application-state.service';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
    selector: 'qz-app',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [AsyncPipe, WelcomeComponent],
})
export class AppComponent {
    constructor(
        protected application: ApplicationStateService,
        private window: Window
    ) {}

    ngOnInit(): void {
        this.window.setTimeout(() => {
            this.application.loading = false;
        }, 3000);
    }
}
