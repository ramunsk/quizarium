import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Answer } from '../../../model/answer';
import { QuizStep } from '../../../model/quiz-step';

@Component({
    selector: 'qz-quiz-step',
    standalone: true,
    imports: [NgClass],
    templateUrl: './quiz-step.component.html',
    styleUrl: './quiz-step.component.scss',
})
export class QuizStepComponent {
    step = input.required<QuizStep>();
    reviewMode = input.required<boolean>();
    answerSelected = output<Answer>();
}
