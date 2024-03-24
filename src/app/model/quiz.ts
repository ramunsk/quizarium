import { Signal, WritableSignal, computed, signal } from '@angular/core';
import * as expect from '../core/expect';
import { Answer } from './answer';
import { Question } from './question';
import { QuizStep } from './quiz-step';

export type QuizState = 'ready' | 'in-progress' | 'solved';

export interface QuizStats {
    totalQuestions: number;
    skippedQuestions: number;
    answeredQuestions: number;
    correctAnswers: number;
    timeSpent: number;
}

export class Quiz {
    readonly currentStepIndex: Signal<number | undefined>;
    readonly isFirstStep: Signal<boolean>;
    readonly isLastStep: Signal<boolean>;

    private steps: QuizStep[];
    private readonly _state: WritableSignal<QuizState>;
    private readonly _currentStep: WritableSignal<QuizStep | undefined>;
    private readonly _stats: WritableSignal<QuizStats | undefined>;

    constructor(questions: Question[]) {
        expect.toBeArray(questions, '[Quiz] invalid "questions" argument value');
        expect.to(questions.length >= 2, '[Quiz] should have at least two questions');
        expect.to(new Set(questions).size === questions.length, '[Quiz] should not have repeating questions');

        this.steps = questions.map((q) => new QuizStep(q));
        this._state = signal('ready');
        this._currentStep = signal(undefined);
        this.currentStepIndex = computed(() => {
            const currentStep = this._currentStep();
            if (!currentStep) {
                return undefined;
            }
            return this.steps.indexOf(currentStep);
        });
        this.isFirstStep = computed(() => {
            return this.currentStep() === this.steps.at(0);
        });
        this.isLastStep = computed(() => {
            return this.currentStep() === this.steps.at(-1);
        });
        this._stats = signal(undefined);
    }

    get state(): Signal<QuizState> {
        return this._state.asReadonly();
    }

    get totalSteps(): number {
        return this.steps.length;
    }

    get currentStep(): Signal<QuizStep | undefined> {
        return this._currentStep.asReadonly();
    }

    get currentStepAnswer(): Signal<Answer | undefined> {
        return computed(() => this._currentStep()?.chosenAnswer());
    }

    get stats(): Signal<QuizStats | undefined> {
        return this._stats.asReadonly();
    }

    start(): void {
        this._state.set('in-progress');
        const firstStep = this.steps[0];
        this._currentStep.set(firstStep);
        firstStep.startTimer();
    }

    gotoPreviousStep(): void {
        expect.to(this.state() !== 'ready', '[Quiz] cannot navigate quiz while in ready state');
        const currentStep = this.currentStep();
        if (!currentStep || this.isFirstStep()) {
            return;
        }

        const index = this.steps.indexOf(currentStep);
        this._state() === 'in-progress' && this._currentStep()?.stopTimer();
        this._currentStep.set(this.steps.at(index - 1)!);
        this._state() === 'in-progress' && this._currentStep()?.startTimer();
    }

    gotoNextStep(): void {
        expect.to(this.state() !== 'ready', '[Quiz] cannot navigate quiz while in ready state');
        const currentStep = this.currentStep();
        if (!currentStep || this.isLastStep()) {
            return;
        }

        const index = this.steps.indexOf(currentStep);
        this._state() === 'in-progress' && this._currentStep()?.stopTimer();
        this._currentStep.set(this.steps.at(index + 1)!);
        this._state() === 'in-progress' && this._currentStep()?.startTimer();
    }

    submit(): void {
        this._state.set('solved');
        this._currentStep()?.stopTimer();
        this._currentStep.set(this.steps[0]);
        this._stats.set(this.getStats());
    }

    private getStats(): QuizStats {
        const totalQuestions = this.steps.length;
        const answeredQuestions = this.steps.filter((q) => q.chosenAnswer()).length;
        const skippedQuestions = totalQuestions - answeredQuestions;
        const correctAnswers = this.steps.filter((q) => q.chosenAnswer()?.isCorrect).length;
        const timeSpent = this.steps.reduce((total, step) => total + step.elapsed(), 0);
        return {
            totalQuestions,
            answeredQuestions,
            skippedQuestions,
            correctAnswers,
            timeSpent,
        };
    }
}
