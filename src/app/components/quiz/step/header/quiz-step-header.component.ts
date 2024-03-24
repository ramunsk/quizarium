import { Component, input } from '@angular/core';
import { QuizStep } from '../../../../model/quiz-step';
import { TimePipe } from '../../../../pipes/time.pipe';

@Component({
    selector: 'qz-quiz-step-header',
    standalone: true,
    imports: [TimePipe],
    templateUrl: './quiz-step-header.component.html',
    styleUrl: './quiz-step-header.component.scss',
})
export class QuizStepHeaderComponent {
    step = input.required<QuizStep>();
}
