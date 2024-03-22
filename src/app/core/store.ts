import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export abstract class Store<T> {
    private readonly valueSubject: BehaviorSubject<T>;

    constructor(initialValue: T) {
        this.valueSubject = new BehaviorSubject(initialValue);
    }

    dispose(): void {
        this.valueSubject.complete();
    }

    protected get value$(): Observable<T> {
        return this.valueSubject.asObservable();
    }

    protected get value(): T {
        return this.valueSubject.getValue();
    }

    protected preUpdate(previousValue: T, newValue: T): T {
        return newValue;
    }

    protected update(updateFn: (state: T) => T) {
        const currentValue = this.valueSubject.getValue();
        let updatedValue = updateFn(currentValue);
        updatedValue = this.preUpdate(currentValue, updatedValue);
        this.valueSubject.next(updatedValue);
    }

    protected select<V>(selectFn: (state: T) => V): Observable<V> {
        return this.valueSubject.pipe(map(selectFn), distinctUntilChanged());
    }
}
