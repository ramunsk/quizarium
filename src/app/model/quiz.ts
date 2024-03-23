import { Signal, WritableSignal, computed, signal } from '@angular/core';
import * as expect from '../core/expect';
import { Answer } from './answer';
import { Question } from './question';
import { QuizStep } from './quiz-step';

export class Quiz {
    private steps: QuizStep[];

    private readonly _currentStep: WritableSignal<QuizStep | undefined>;

    constructor(questions: Question[]) {
        expect.toBeArray(questions, '[Quiz] invalid "questions" argument value');
        expect.to(questions.length >= 2, '[Quiz] should have at least two questions');
        expect.to(new Set(questions).size === questions.length, '[Quiz] should not have repeating questions');

        this.steps = questions.map((q) => new QuizStep(q));
        this._currentStep = signal(undefined);
    }

    get currentStep(): Signal<QuizStep | undefined> {
        return this._currentStep.asReadonly();
    }

    get currentStepAnswer(): Signal<Answer | undefined> {
        return computed(() => this._currentStep()?.chosenAnswer());
    }

    start(): void {
        this._currentStep.set(this.steps[0]);
    }

    submit(): void {
        this._currentStep.set(undefined);
    }

    get isFirstStep(): boolean {
        return this.currentStep() === this.steps.at(0);
    }

    get isLastStep(): boolean {
        return this.currentStep() === this.steps.at(-1);
    }

    gotoPreviousStep(): void {
        const currentStep = this.currentStep();
        if (!currentStep || this.isFirstStep) {
            return;
        }

        const index = this.steps.indexOf(currentStep);
        this._currentStep.set(this.steps.at(index - 1));
    }

    gotoNextStep(): void {
        const currentStep = this.currentStep();
        if (!currentStep || this.isLastStep) {
            return;
        }

        const index = this.steps.indexOf(currentStep);
        this._currentStep.set(this.steps.at(index + 1));
    }
}
