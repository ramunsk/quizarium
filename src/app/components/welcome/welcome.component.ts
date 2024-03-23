import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, delay, of, take } from 'rxjs';
import { ApplicationStateService } from '../../services/application-state.service';
import { QuizService } from '../../services/quiz.service';

@Component({
    selector: 'qz-welcome',
    standalone: true,
    templateUrl: './welcome.component.html',
    styleUrl: './welcome.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
    constructor(
        private quizService: QuizService,
        private application: ApplicationStateService
    ) {}

    ngOnInit(): void {
        console.log('loading');

        const delay$ = of(true).pipe(delay(3000));
        const questions$ = this.quizService.loadQuestions();

        combineLatest([delay$, questions$])
            .pipe(take(1))
            .subscribe(() => {
                console.log('Loaded');
                this.application.loading = false;
            });
    }
}
