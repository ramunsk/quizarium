import { Signal, WritableSignal, computed, signal } from '@angular/core';
import * as expect from '../core/expect';
import { Answer } from './answer';
import { Question } from './question';
import { QuizStep } from './quiz-step';

export interface QuizStats {
    totalQuestions: number;
    skippedQuestions: number;
    answeredQuestions: number;
    correctAnswers: number;
}

export class Quiz {
    private steps: QuizStep[];

    private readonly _currentStep: WritableSignal<QuizStep>;

    constructor(questions: Question[]) {
        expect.toBeArray(questions, '[Quiz] invalid "questions" argument value');
        expect.to(questions.length >= 2, '[Quiz] should have at least two questions');
        expect.to(new Set(questions).size === questions.length, '[Quiz] should not have repeating questions');

        this.steps = questions.map((q) => new QuizStep(q));
        this._currentStep = signal(this.steps[0]);
    }

    get currentStep(): Signal<QuizStep> {
        return this._currentStep.asReadonly();
    }

    get currentStepAnswer(): Signal<Answer | undefined> {
        return computed(() => this._currentStep()?.chosenAnswer());
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
        this._currentStep.set(this.steps.at(index - 1)!);
    }

    gotoNextStep(): void {
        const currentStep = this.currentStep();
        if (!currentStep || this.isLastStep) {
            return;
        }

        const index = this.steps.indexOf(currentStep);
        this._currentStep.set(this.steps.at(index + 1)!);
    }

    getStats(): QuizStats {
        const totalQuestions = this.steps.length;
        const answeredQuestions = this.steps.filter((q) => q.chosenAnswer()).length;
        const skippedQuestions = totalQuestions - answeredQuestions;
        const correctAnswers = this.steps.filter((q) => q.chosenAnswer()?.isCorrect).length;
        return {
            totalQuestions,
            answeredQuestions,
            skippedQuestions,
            correctAnswers,
        };
    }
}
