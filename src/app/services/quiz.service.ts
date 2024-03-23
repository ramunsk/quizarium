import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuizService {
    constructor(private http: HttpClient) {}

    loadQuestions(): Observable<void> {
        return this.http.get<void>('assets/questions.json').pipe(take(1));
    }
}
