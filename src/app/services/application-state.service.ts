import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../core/store';

export interface ApplicationState {
    loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class ApplicationStateService extends Store<ApplicationState> {
    constructor() {
        super({ loading: true });
    }

    get isLoading$(): Observable<boolean> {
        return this.select((state) => state.loading);
    }

    set loading(loading: boolean) {
        this.update((state) => ({ ...state, loading }));
    }
}
