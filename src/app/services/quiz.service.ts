import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { Answer } from '../model/answer';
import { Question } from '../model/question';

interface QuestionJson {
    question: string;
    choices: string[];
    correctAnswer: number;
}

@Injectable({ providedIn: 'root' })
export class QuizService {
    private _questions: Question[];

    constructor(private http: HttpClient) {
        this._questions = [];
    }

    loadQuestions(): Observable<void> {
        return this.http.get<QuestionJson[]>('assets/questions.json').pipe(
            take(1),
            map((questions: QuestionJson[]) => {
                this._questions = questions.map((json) => {
                    const answers = json.choices.map((choice, i) => new Answer(choice, i === json.correctAnswer));
                    return new Question(json.question, answers);
                });
            })
        );
    }
}
