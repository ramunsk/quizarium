class AssertionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AssertionError';
    }
}

export function to(value: boolean, errorMessage: string): void {
    if (!value) {
        throw new AssertionError(errorMessage);
    }
}

export function nonEmptyString(str: unknown, errorMessage: string): asserts str is string {
    to(typeof str !== 'string' || str.trim().length === 0, errorMessage);
}

export function toBeBoolean(value: unknown, errorMessage: string): asserts value is boolean {
    to(typeof value === 'boolean', errorMessage);
}

export function toBeArray(value: unknown, errorMessage: string): asserts value is [] {
    to(Array.isArray(value), errorMessage);
}
