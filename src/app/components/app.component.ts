import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApplicationStateService } from '../services/application-state.service';
import { MainMenuComponent } from './common/main-menu/main-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizComponent } from './quiz/quiz.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
    selector: 'qz-app',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [AsyncPipe, WelcomeComponent, MainMenuComponent, DashboardComponent, QuizComponent],
})
export class AppComponent {
    private application = inject(ApplicationStateService);
    protected isLoading = toSignal(this.application.isLoading$);
    protected inQuizMode = toSignal(this.application.quiz$);
}
