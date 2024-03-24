import * as expect from '../core/expect';

export class Answer {
    readonly text: string;
    readonly isCorrect: boolean;

    constructor(text: string, isCorrect: boolean) {
        expect.nonEmptyString(text, '[Answer] Invalid "text" argument');
        expect.toBeBoolean(isCorrect, '[Answer] Invalid "isCorrect" argument');

        this.text = text;
        this.isCorrect = isCorrect;
    }
}
