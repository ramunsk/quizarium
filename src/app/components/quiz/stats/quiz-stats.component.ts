import { Component, input } from '@angular/core';
import { QuizStats } from '../../../model/quiz';

@Component({
    selector: 'qz-quiz-stats',
    standalone: true,
    imports: [],
    templateUrl: './quiz-stats.component.html',
    styleUrl: './quiz-stats.component.scss',
})
export class QuizStatsComponent {
    stats = input.required<QuizStats>();
}
