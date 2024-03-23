import { Signal, WritableSignal, signal } from '@angular/core';
import * as expect from '../core/expect';
import { Answer } from './answer';
import { Question } from './question';

export class QuizStep {
    readonly question: Question;

    private _chosenAnswer: WritableSignal<Answer | undefined>;

    constructor(question: Question) {
        this.question = question;
        this._chosenAnswer = signal(undefined);
    }

    get chosenAnswer(): Signal<Answer | undefined> {
        return this._chosenAnswer.asReadonly();
    }

    set chosenAnswer(answer: Answer) {
        expect.to(answer && this.question.answers.includes(answer), '[QuizStep] answer does not belong to a question');
        this._chosenAnswer.set(answer);
    }
}
