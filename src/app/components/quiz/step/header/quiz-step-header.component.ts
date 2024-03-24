import { Component, input } from '@angular/core';
import { Quiz } from '../../../../model/quiz';
import { TimePipe } from '../../../../pipes/time.pipe';

@Component({
    selector: 'qz-quiz-step-header',
    standalone: true,
    imports: [TimePipe],
    templateUrl: './quiz-step-header.component.html',
    styleUrl: './quiz-step-header.component.scss',
})
export class QuizStepHeaderComponent {
    quiz = input.required<Quiz>();
}
