import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApplicationStateService } from '../services/application-state.service';
import { MainMenuComponent } from './common/main-menu/main-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
    selector: 'qz-app',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [AsyncPipe, WelcomeComponent, DashboardComponent, MainMenuComponent],
})
export class AppComponent {
    constructor(protected application: ApplicationStateService) {}
}
