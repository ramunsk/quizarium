import { describe, expect, it, vi } from 'vitest';
import { Answer } from './answer';
import { Question } from './question';
import { Quiz } from './quiz';

describe('Quiz', () => {
    describe('when creating should', () => {
        it('throw error if invalid "questions" argument passed', () => {
            // @ts-expect-error for testing purposes
            expect(() => new Quiz(undefined)).toThrow(/invalid.*questions.*argument/g);
            // @ts-expect-error for testing purposes
            expect(() => new Quiz(null)).toThrow(/invalid.*questions.*argument/g);
            // @ts-expect-error for testing purposes
            expect(() => new Quiz(1)).toThrow(/invalid.*questions.*argument/g);
            // @ts-expect-error for testing purposes
            expect(() => new Quiz('a')).toThrow(/invalid.*questions.*argument/g);
        });

        it('throw error if less than two questions provided', () => {
            const question = new Question('Question1', [new Answer('Answer 1', true), new Answer('Answer 2', false)]);
            expect(() => new Quiz([])).toThrow(/at.*least.*two/g);
            expect(() => new Quiz([question])).toThrow(/at.*least.*two/g);
        });

        it('throw error if provided questions are not unique', () => {
            const question = new Question('Question1', [new Answer('Answer 1', true), new Answer('Answer 2', false)]);
            expect(() => new Quiz([question, question])).toThrow(/not.*repeating/g);
        });

        it('have correct state', () => {
            const question1 = new Question('Question1', [new Answer('Answer 1', true), new Answer('Answer 2', false)]);
            const question2 = new Question('Question2', [new Answer('Answer 1', true), new Answer('Answer 2', false)]);

            const quiz = new Quiz([question1, question2]);

            expect(quiz.state()).toBe('ready');
            expect(quiz.totalSteps).toBe(2);
            expect(quiz.currentStepIndex()).toBeUndefined();
            expect(quiz.currentStep()).toBeUndefined();
            expect(quiz.currentStepAnswer()).toBeUndefined();
            expect(quiz.isFirstStep()).toBe(false);
            expect(quiz.isLastStep()).toBe(false);
        });
    });

    describe('when starting should', () => {
        let questions = [
            new Question('Question 1', [new Answer('Incorrect answer', false), new Answer('Correct answer', true)]),
            new Question('Question 2', [new Answer('Correct answer', true), new Answer('Incorrect answer', false)]),
        ];

        const createQuiz = (): Quiz => {
            return new Quiz(questions);
        };

        it('should change state to "in-progress"', () => {
            const quiz = createQuiz();
            quiz.start();
            expect(quiz.state()).toBe('in-progress');
        });

        it('should should set first step as current', () => {
            const quiz = createQuiz();
            quiz.start();
            expect(quiz.currentStep()?.question).toBe(questions[0]);
        });

        it('should should set "currentStepIndex" to zero', () => {
            const quiz = createQuiz();
            quiz.start();
            expect(quiz.currentStepIndex()).toBe(0);
        });

        it('should have "isFirstStep == true"', () => {
            const quiz = createQuiz();
            quiz.start();
            expect(quiz.isFirstStep()).toBe(true);
        });

        it('should have "isLastStep == false"', () => {
            const quiz = createQuiz();
            quiz.start();
            expect(quiz.isLastStep()).toBe(false);
        });

        it('should start first step timer', () => {
            const quiz = createQuiz();
            // @ts-expect-error Need to access first step to spy on timer
            const firstStep = quiz.steps[0];
            const spy = vi.spyOn(firstStep, 'startTimer').mockImplementation(() => undefined);

            quiz.start();

            expect(spy).toHaveBeenCalledOnce();
        });
    });

    describe('when navigating through steps', () => {
        let questions = [
            new Question('Question 1', [new Answer('Incorrect answer', false), new Answer('Correct answer', true)]),
            new Question('Question 2', [new Answer('Correct answer', true), new Answer('Incorrect answer', false)]),
            new Question('Question 3', [new Answer('Incorrect answer', false), new Answer('Correct answer', true)]),
        ];

        const createQuiz = (): Quiz => {
            return new Quiz(questions);
        };

        describe('always should', () => {
            it.todo('remain on first step when navigating to previous one', () => {});
            it.todo('remain on last step when navigating to next one', () => {});
            it.todo('set next step as current step correctly', () => {});
            it.todo('set previous step as current step correctly', () => {});
        });

        describe('in "in-progress" state should', () => {
            it.todo('stop timer on current step before navigating to next one', () => {});
            it.todo('start timer on next step when navigating to it', () => {});
            it.todo('stop timer on current step before navigating to previous one', () => {});
            it.todo('start timer on previous step when navigating to it', () => {});
        });

        describe('in "solved" state should', () => {
            it.todo('not stop timer on current step before navigating to next one', () => {});
            it.todo('not start timer on next step when navigating to it', () => {});
            it.todo('not stop timer on current step before navigating to previous one', () => {});
            it.todo('not start timer on previous step when navigating to it', () => {});
        });

        describe('when submitting should', () => {
            it.todo('set state to solved', () => {});
            it.todo('set current step to first step', () => {});
        });
    });
});
