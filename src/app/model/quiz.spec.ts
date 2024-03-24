import { MockInstance, describe, expect, it, vi } from 'vitest';
import { Answer } from './answer';
import { Question } from './question';
import { Quiz } from './quiz';

describe('Quiz', () => {
    let questions = [
        new Question('Question 1', [new Answer('Incorrect answer', false), new Answer('Correct answer', true)]),
        new Question('Question 2', [new Answer('Correct answer', true), new Answer('Incorrect answer', false)]),
        new Question('Question 3', [new Answer('Incorrect answer', false), new Answer('Correct answer', true)]),
    ];

    type StepTimerSpies = {
        startTimer: MockInstance;
        stopTimer: MockInstance;
    };

    const createQuiz = (): [Quiz, StepTimerSpies[]] => {
        const quiz = new Quiz(questions);
        // @ts-expect-error for testing purposes
        const steps = quiz.steps;
        const spies = steps.map((step) => ({
            startTimer: vi.spyOn(step, 'startTimer').mockImplementation(() => undefined),
            stopTimer: vi.spyOn(step, 'stopTimer').mockImplementation(() => undefined),
        }));
        return [quiz, spies];
    };

    const clearSpyStats = (...spies: StepTimerSpies[]): void => {
        spies.forEach((spy) => {
            spy.startTimer.mockClear();
            spy.stopTimer.mockClear();
        });
    };

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
            expect(() => new Quiz([])).toThrow(/at.*least.*two/g);
            expect(() => new Quiz([questions[0]])).toThrow(/at.*least.*two/g);
        });

        it('throw error if provided questions are not unique', () => {
            expect(() => new Quiz([questions[0], questions[0]])).toThrow(/not.*repeating/g);
        });

        it('have correct state', () => {
            const [quiz] = createQuiz();

            expect(quiz.state()).toBe('ready');
            expect(quiz.totalSteps).toBe(3);
            expect(quiz.currentStepIndex()).toBeUndefined();
            expect(quiz.currentStep()).toBeUndefined();
            expect(quiz.currentStepAnswer()).toBeUndefined();
            expect(quiz.isFirstStep()).toBe(false);
            expect(quiz.isLastStep()).toBe(false);
        });
    });

    describe('when starting should', () => {
        it('should change state to "in-progress"', () => {
            const [quiz] = createQuiz();
            quiz.start();
            expect(quiz.state()).toBe('in-progress');
        });

        it('should should set first step as current', () => {
            const [quiz] = createQuiz();
            quiz.start();
            expect(quiz.currentStep()?.question).toBe(questions[0]);
        });

        it('should should set "currentStepIndex" to zero', () => {
            const [quiz] = createQuiz();
            quiz.start();
            expect(quiz.currentStepIndex()).toBe(0);
        });

        it('should have "isFirstStep == true"', () => {
            const [quiz] = createQuiz();
            quiz.start();
            expect(quiz.isFirstStep()).toBe(true);
        });

        it('should have "isLastStep == false"', () => {
            const [quiz] = createQuiz();
            quiz.start();
            expect(quiz.isLastStep()).toBe(false);
        });

        it('should start first step timer', () => {
            const [quiz, spies] = createQuiz();
            quiz.start();
            expect(spies[0].startTimer).toHaveBeenCalledOnce();
        });
    });

    describe('when navigating through steps', () => {
        describe('always should', () => {
            it('throw error if quiz is in "ready" state', () => {
                const [quiz] = createQuiz();
                expect(() => quiz.gotoNextStep()).toThrow(/cannot navigate/g);
                expect(() => quiz.gotoPreviousStep()).toThrow(/cannot navigate/g);
            });
            it('set next step as current step correctly', () => {
                const [quiz] = createQuiz();
                quiz.start();

                quiz.gotoNextStep(); // now we're on 2nd step
                expect(quiz.currentStep()?.question === questions[1]);
                expect(quiz.isFirstStep()).toBe(false);
                expect(quiz.isLastStep()).toBe(false);
                expect(quiz.currentStepIndex()).toBe(1);

                quiz.gotoNextStep(); // now we're on 3nd step
                expect(quiz.currentStep()?.question === questions[2]);
                expect(quiz.isFirstStep()).toBe(false);
                expect(quiz.isLastStep()).toBe(true);
                expect(quiz.currentStepIndex()).toBe(2);

                quiz.gotoNextStep(); // now we're still on 3nd step
                expect(quiz.currentStep()?.question === questions[2]);
                expect(quiz.isFirstStep()).toBe(false);
                expect(quiz.isLastStep()).toBe(true);
                expect(quiz.currentStepIndex()).toBe(2);
            });
            it('set previous step as current step correctly', () => {
                const [quiz] = createQuiz();
                quiz.start();
                quiz.gotoNextStep(); // now we're on 2nd step
                quiz.gotoNextStep(); // now we're on 3rd step

                quiz.gotoPreviousStep(); // now we're on 2nd step
                expect(quiz.currentStep()?.question === questions[1]);
                expect(quiz.isFirstStep()).toBe(false);
                expect(quiz.isLastStep()).toBe(false);
                expect(quiz.currentStepIndex()).toBe(1);

                quiz.gotoPreviousStep(); // now we're on 1st step
                expect(quiz.currentStep()?.question === questions[0]);
                expect(quiz.isFirstStep()).toBe(true);
                expect(quiz.isLastStep()).toBe(false);
                expect(quiz.currentStepIndex()).toBe(0);

                quiz.gotoPreviousStep(); // now we're still on 1st step
                expect(quiz.currentStep()?.question === questions[0]);
                expect(quiz.isFirstStep()).toBe(true);
                expect(quiz.isLastStep()).toBe(false);
                expect(quiz.currentStepIndex()).toBe(0);
            });
        });

        describe('in "in-progress" state should', () => {
            it('stop and start timers of relevant steps', () => {
                const [quiz, spies] = createQuiz();

                // starting quiz should start 1st step timer
                quiz.start();
                expect(spies[0].startTimer).toHaveBeenCalledOnce();

                // navigating from 1st step to 2nd step
                quiz.gotoNextStep();
                expect(spies[0].stopTimer).toHaveBeenCalledOnce();
                expect(spies[1].startTimer).toHaveBeenCalledOnce();

                // navigating from 2nd step to 3rd step
                quiz.gotoNextStep();
                expect(spies[1].stopTimer).toHaveBeenCalledOnce();
                expect(spies[2].startTimer).toHaveBeenCalledOnce();

                // navigating from 3nd step forward, should do nothing as we're at the end
                quiz.gotoNextStep();
                expect(spies[2].stopTimer).not.toHaveBeenCalled();

                // clear all spies
                clearSpyStats(...spies);

                // navigating from 3rd step to 2nd step
                quiz.gotoPreviousStep();
                expect(spies[2].stopTimer).toHaveBeenCalledOnce();
                expect(spies[1].startTimer).toHaveBeenCalledOnce();

                // navigating from 2nd step to 1st step
                quiz.gotoPreviousStep();
                expect(spies[1].stopTimer).toHaveBeenCalledOnce();
                expect(spies[0].startTimer).toHaveBeenCalledOnce();

                // navigating from 1st step backwards; should do nothing as we're at the start
                quiz.gotoPreviousStep();
                expect(spies[0].stopTimer).not.toHaveBeenCalled();
            });
        });

        describe('in "solved" state should', () => {
            it('not start or stop any timers', () => {
                const [quiz, spies] = createQuiz();
                quiz.start();
                quiz.submit();

                clearSpyStats(...spies);

                // we're at 1st step, navigate forward and backward
                quiz.gotoNextStep();
                quiz.gotoNextStep();
                quiz.gotoNextStep();
                quiz.gotoPreviousStep();
                quiz.gotoPreviousStep();
                quiz.gotoPreviousStep();
                expect(spies[0].startTimer).not.toHaveBeenCalled();
                expect(spies[0].stopTimer).not.toHaveBeenCalled();
                expect(spies[1].startTimer).not.toHaveBeenCalled();
                expect(spies[1].stopTimer).not.toHaveBeenCalled();
                expect(spies[2].startTimer).not.toHaveBeenCalled();
                expect(spies[2].stopTimer).not.toHaveBeenCalled();
            });
        });
    });
    describe('when submitting should', () => {
        it('set state to "solved"', () => {
            const [quiz] = createQuiz();
            quiz.start();
            quiz.submit();

            expect(quiz.state()).toBe('solved');
        });
        it('set current step to first step', () => {
            const [quiz] = createQuiz();
            quiz.start();
            quiz.gotoNextStep();
            quiz.submit();
            expect(quiz.currentStep()?.question).toBe(questions[0]);
        });
        it('have stats set', () => {
            const [quiz] = createQuiz();
            quiz.start();
            quiz.submit();
            expect(quiz.stats()).toBeDefined();
        });
    });
});
