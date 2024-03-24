import { Signal, WritableSignal, signal } from '@angular/core';
import * as expect from '../core/expect';
import { Timer } from '../core/timer';
import { Answer } from './answer';
import { Question } from './question';

export class QuizStep {
    readonly question: Question;

    private _chosenAnswer: WritableSignal<Answer | undefined>;
    private _elapsed: WritableSignal<number>;
    private timer: Timer;

    constructor(question: Question) {
        this.question = question;
        this._chosenAnswer = signal(undefined);
        this.timer = new Timer(100);
        this._elapsed = signal(0);
    }

    get chosenAnswer(): Signal<Answer | undefined> {
        return this._chosenAnswer.asReadonly();
    }

    get elapsed(): Signal<number> {
        return this._elapsed.asReadonly();
    }

    set chosenAnswer(answer: Answer) {
        expect.to(answer && this.question.answers.includes(answer), '[QuizStep] answer does not belong to a question');
        this._chosenAnswer.set(answer);
        console.log('Chosen answer:', answer.text, answer.isCorrect);
    }

    startTimer(): void {
        this.timer.start((elapsed) => {
            this._elapsed.set(elapsed);
        }, this.elapsed());
    }

    stopTimer(): void {
        this.timer.stop();
    }
}
