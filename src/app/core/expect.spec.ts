import { describe, expect, it } from 'vitest';
import { nonEmptyString, to, toBeArray, toBeBoolean, toBeDefined } from './expect';

describe('Expectation functions', () => {
    describe('[to] should', () => {
        it('pass if value is true', () => {
            expect(() => to(true, '')).not.toThrow();
            expect(() => to(1 === 1, '')).not.toThrow();
        });

        it('throw error if value is false', () => {
            expect(() => to(false, 'abc')).toThrow('abc');
            expect(() => to(1 !== 1, 'abc')).toThrow('abc');
        });
    });

    describe('[nonEmptyString] should', () => {
        it.each`
            str
            ${'a'}
            ${' a'}
            ${'a '}
        `('pass with $str argument', ({ str }) => {
            expect(() => nonEmptyString(str, 'error')).not.toThrow();
        });

        it.each`
            arg
            ${''}
            ${null}
            ${undefined}
            ${{}}
        `('throw with $arg argument', ({ arg }) => {
            expect(() => nonEmptyString(arg, 'error')).toThrow('error');
        });
    });

    describe('[toBeBoolean] should', () => {
        it('pass with boolean arguments', () => {
            expect(() => toBeBoolean(true, 'error')).not.toThrow();
            expect(() => toBeBoolean(false, 'error')).not.toThrow();
        });
        it('throw with non boolean argument', () => {
            expect(() => toBeBoolean('', 'error')).toThrow('error');
            expect(() => toBeBoolean(undefined, 'error')).toThrow('error');
            expect(() => toBeBoolean({}, 'error')).toThrow('error');
        });
    });

    describe('[toBeArray] should', () => {
        it('pass with array argument', () => {
            expect(() => toBeArray([], 'error')).not.toThrow();
            expect(() => toBeArray(new Array(1), 'error')).not.toThrow();
        });

        it('throw with non array argument', () => {
            expect(() => toBeArray(null, 'error')).toThrow('error');
            expect(() => toBeArray(undefined, 'error')).toThrow('error');
            expect(() => toBeArray('', 'error')).toThrow('error');
            expect(() => toBeArray({}, 'error')).toThrow('error');
            expect(() => toBeArray({ length: 0 }, 'error')).toThrow('error');
            expect(() => toBeArray(new Map(), 'error')).toThrow('error');
        });
    });

    describe('[toBeDefined] should', () => {
        describe('pass with "defined" arguments', () => {
            it.each`
                arg
                ${0}
                ${''}
                ${{}}
                ${[]}
            `('$arg', ({ arg }) => {
                expect(() => toBeDefined(arg, 'error')).not.toThrow();
            });
        });
        it('throw with "null" or "undefined" argument', () => {
            expect(() => toBeDefined(null, 'error')).toThrow('error');
            expect(() => toBeDefined(undefined, 'error')).toThrow('error');
        });
    });
});
