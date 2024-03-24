import { Component } from '@angular/core';
import { ApplicationStateService } from '../../services/application-state.service';
import { QuizService } from '../../services/quiz.service';

@Component({
    selector: 'qz-dashboard',
    standalone: true,
    imports: [],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    constructor(
        private quizService: QuizService,
        private application: ApplicationStateService
    ) {}

    startQuiz(): void {
        const quiz = this.quizService.createQuiz();
        this.application.startQuiz(quiz);
    }
}
