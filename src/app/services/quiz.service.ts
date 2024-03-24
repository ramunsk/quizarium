import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { randomBetween } from '../core/utils';
import { Answer } from '../model/answer';
import { Question } from '../model/question';
import { Quiz } from '../model/quiz';

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

    createQuiz(): Quiz {
        // create an array of randomly selected questions
        const quizQuestions: Question[] = [];
        while (quizQuestions.length < 2) {
            const index = randomBetween(0, this._questions.length - 1);
            const question = this._questions[index];
            if (!quizQuestions.includes(question)) {
                quizQuestions.push(question);
            }
        }

        return new Quiz(quizQuestions);
    }
}
