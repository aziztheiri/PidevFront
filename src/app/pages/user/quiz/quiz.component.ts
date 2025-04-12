import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/models/question.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent {
  questions: Question[] = [
    {
      questionText: "What is the capital of France?",
      options: ["Paris", "Rome", "Berlin", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      questionText: "Which color is associated with our brand?",
      options: ["Blue", "Green", "Orange", "Purple"],
      correctAnswer: "Orange"
    },
    {
      questionText: "What is the term for insurance risk spreading?",
      options: ["Pooling", "Diversification", "Segmentation", "Insolvency"],
      correctAnswer: "Pooling"
    }
  ];
  
  quizSubmitted: boolean = false;
  quizResultMessage: string = "";
  newPoints: number = 0;
  milestoneMessage: string = "";
  alreadyPassed: boolean | undefined = false;

  // You can configure what percentage of correct answers is needed to pass.
  passThreshold: number = 0.70;  // 70%

  constructor(private quizService: UserService, private authService: AuthService,private router :Router) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        // Assume user.quizpassed is defined as boolean.
        this.alreadyPassed = user.quizpassed;
      }
    });  }

  submitQuiz(): void {
    const totalQuestions = this.questions.length;
    const correctCount = this.questions.filter(q => q.userAnswer === q.correctAnswer).length;
    const scorePercentage = correctCount / totalQuestions;
    const passed = scorePercentage >= this.passThreshold;

    this.quizService.submitQuiz(passed).subscribe(
      (res: any) => {
        this.quizSubmitted = true;
        this.quizResultMessage = res.message + ` You got ${correctCount} out of ${totalQuestions} correct.`;
        this.newPoints = res.newPoints;
        if (res.notification) {
          this.milestoneMessage = res.notification;
          // Optionally, use a toast library to display a nicer message.
          alert(res.notification);
        }
        setTimeout(() => {
          this.router.navigate(['/user/home']);

        }, 3000); // Delay of 3 seconds between requests
      

      },
      error => {
        console.error("Quiz submission error", error);
        this.quizResultMessage = "Error submitting quiz.";
        this.router.navigate(['/user/home']);

      }
      
    );
  }
  allQuestionsAnswered(): boolean {
    return this.questions.every(q => !!q.userAnswer);
  }
}
