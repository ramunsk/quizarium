import { Component, input } from '@angular/core';
import { QuizStep } from '../../../model/quiz-step';

@Component({
    selector: 'qz-quiz-step',
    standalone: true,
    imports: [],
    templateUrl: './quiz-step.component.html',
    styleUrl: './quiz-step.component.scss',
})
export class QuizStepComponent {
    step = input.required<QuizStep>();
}
