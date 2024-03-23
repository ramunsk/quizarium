import * as expect from '../core/expect';
import { Answer } from './answer';

export class Question {
    readonly text: string;
    readonly answers: Answer[];
    readonly correctAnswer: Answer;

    constructor(text: string, answers: Answer[]) {
        expect.nonEmptyString(text, '[Question] invalid "text" argument');
        expect.toBeArray(answers, '[Question] invalid "answers" argument');
        expect.to(answers.length >= 2, '[Question] question should have at least two answers');

        const correctAnswers = answers.filter((a) => a.isCorrect);
        expect.to(correctAnswers.length === 1, '[Question] questions should have one correct answer');

        this.text = text;
        this.answers = [...answers];
        this.correctAnswer = correctAnswers[0];
    }
}
