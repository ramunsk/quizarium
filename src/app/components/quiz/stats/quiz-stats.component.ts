import { Component, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Quiz, QuizStats } from '../../../model/quiz';
import { ApplicationStateService } from '../../../services/application-state.service';

@Component({
    selector: 'qz-quiz-stats',
    standalone: true,
    imports: [],
    templateUrl: './quiz-stats.component.html',
    styleUrl: './quiz-stats.component.scss',
})
export class QuizStatsComponent {
    protected quiz: Signal<Quiz | undefined>;
    protected stats: Signal<QuizStats | undefined>;

    constructor(application: ApplicationStateService) {
        this.quiz = toSignal(application.quiz$);
        this.stats = computed(() => this.quiz()?.getStats());
    }
}
