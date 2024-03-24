import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Answer } from '../../model/answer';
import { Quiz } from '../../model/quiz';
import { TimePipe } from '../../pipes/time.pipe';
import { ApplicationStateService } from '../../services/application-state.service';
import { QuizStatsComponent } from './stats/quiz-stats.component';
import { QuizStepHeaderComponent } from './step/header/quiz-step-header.component';
import { QuizStepComponent } from './step/quiz-step.component';

@Component({
    selector: 'qz-quiz',
    standalone: true,
    imports: [QuizStepComponent, QuizStepHeaderComponent, QuizStatsComponent, TimePipe],
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.scss',
})
export class QuizComponent {
    protected quiz: Signal<Quiz | undefined>;

    constructor(application: ApplicationStateService) {
        this.quiz = toSignal(application.quiz$);
    }

    onAnswerSelected(answer: Answer): void {
        this.quiz()!.currentStep()!.chosenAnswer = answer;
        this.quiz()?.gotoNextStep();
    }

    submit(): void {
        this.quiz()?.submit();
    }
}
