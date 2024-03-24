import { describe, expect, it } from 'vitest';
import { Answer } from './answer';
import { Question } from './question';

describe('Question', () => {
    describe('when creating should', () => {
        describe('throw error when invalid "text" argument is passed', () => {
            it.each`
                text
                ${null}
                ${undefined}
                ${{}}
                ${''}
                ${true}
                ${false}
            `('$text', ({ text }) => {
                expect(() => new Question(text, [])).toThrow(/text.*argument/);
            });
        });

        describe('throw error when invalid "answers" argument is passed', () => {
            it.each`
                answers
                ${null}
                ${undefined}
                ${{}}
                ${''}
                ${true}
                ${false}
            `('$answers', ({ answers }) => {
                expect(() => new Question('Question', answers)).toThrow(/answers.*argument/);
            });
        });

        it('throw error if only one answer is provided', () => {
            const answer = new Answer('answer1', true);
            expect(() => new Question('Question', [answer])).toThrow('at least two answers');
        });

        it('throw error if there are no correct answers among provided answers', () => {
            const answer1 = new Answer('answer1', false);
            const answer2 = new Answer('answer2', false);
            expect(() => new Question('Question', [answer1, answer2])).toThrow('one correct answer');
        });

        it('throw error if there more than one correct answer among provided answers', () => {
            const answer1 = new Answer('answer1', true);
            const answer2 = new Answer('answer2', true);
            expect(() => new Question('Question', [answer1, answer2])).toThrow('one correct answer');
        });
    });
});
