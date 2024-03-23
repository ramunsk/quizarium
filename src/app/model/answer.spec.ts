import { describe, expect, it } from 'vitest';
import { Answer } from './answer';

describe('Answer', () => {
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
                expect(() => new Answer(text, false)).toThrow(/text.*argument/);
            });
        });
        describe('throw error when invalid "isCorrect" argument is passed', () => {
            it.each`
                isCorrect
                ${null}
                ${undefined}
                ${{}}
                ${''}
            `('$isCorrect', ({ isCorrect }) => {
                expect(() => new Answer('Question', isCorrect)).toThrow(/isCorrect.*argument/);
            });
        });
        it('create instance with provided values', () => {
            const answer1 = new Answer('answer', false);
            expect(answer1.text).toBe('answer');
            expect(answer1.isCorrect).toBe(false);

            const answer2 = new Answer('another answer', true);
            expect(answer2.text).toBe('another answer');
            expect(answer2.isCorrect).toBe(true);
        });
    });
});
