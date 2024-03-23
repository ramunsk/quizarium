import * as expect from '../core/expect';
import { Answer } from './answer';

export class Question {
    readonly text: string;
    readonly answers: Answer[];

    constructor(text: string, answers: Answer[]) {
        expect.nonEmptyString(text, '[Question] invalid "text" argument');
        expect.toBeArray(answers, '[Question] invalid "answers" argument');

        this.text = text;
        this.answers = answers;
    }
}
