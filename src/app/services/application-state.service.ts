import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../core/store';
import { Quiz } from '../model/quiz';

export interface ApplicationState {
    loading: boolean;
    quiz: Quiz | undefined;
}

@Injectable({ providedIn: 'root' })
export class ApplicationStateService extends Store<ApplicationState> {
    constructor() {
        super({ loading: true, quiz: undefined });
    }

    get isLoading$(): Observable<boolean> {
        return this.select((state) => state.loading);
    }

    set loading(loading: boolean) {
        this.update((state) => ({ ...state, loading }));
    }

    get quiz$(): Observable<Quiz | undefined> {
        return this.select((state) => state.quiz);
    }

    startQuiz(quiz: Quiz): void {
        this.update((state) => ({ ...state, quiz }));
    }

    endQuiz(): void {
        this.update((state) => ({ ...state, quiz: undefined }));
    }
}
