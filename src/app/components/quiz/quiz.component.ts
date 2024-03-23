import { Component, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Quiz } from '../../model/quiz';
import { ApplicationStateService } from '../../services/application-state.service';
import { QuizStatsComponent } from './stats/quiz-stats.component';
import { QuizStepComponent } from './step/quiz-step.component';

@Component({
    selector: 'qz-quiz',
    standalone: true,
    imports: [QuizStepComponent, QuizStatsComponent],
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.scss',
})
export class QuizComponent {
    protected quiz: Signal<Quiz | undefined>;
    protected solved = signal<boolean>(false);

    constructor(application: ApplicationStateService) {
        this.quiz = toSignal(application.quiz$);
    }
}
