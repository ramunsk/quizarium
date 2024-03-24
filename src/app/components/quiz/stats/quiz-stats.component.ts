import { Component, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Quiz, QuizStats } from '../../../model/quiz';
import { TimePipe } from '../../../pipes/time.pipe';
import { ApplicationStateService } from '../../../services/application-state.service';

@Component({
    selector: 'qz-quiz-stats',
    standalone: true,
    imports: [TimePipe],
    templateUrl: './quiz-stats.component.html',
    styleUrl: './quiz-stats.component.scss',
})
export class QuizStatsComponent {
    protected quiz: Signal<Quiz | undefined>;
    protected stats: Signal<QuizStats | undefined>;

    constructor(protected application: ApplicationStateService) {
        this.quiz = toSignal(application.quiz$);
        this.stats = computed(() => this.quiz()?.getStats());
    }
}
