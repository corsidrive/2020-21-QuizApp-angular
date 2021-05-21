import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../model/question';
import { Counter } from './counter';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private counter:Counter
  private currentQuestion:any

  private questions:Array<any> = [];
  
  constructor(private httpClient:HttpClient) { 

    this.getResponse()
         this.counter = new Counter(0,0,this.questions.length)
    
    // this.currentQuestion = this.questions[0];
}

 getCurrentQuestion(){
     return this.currentQuestion
 }

  getNextQuestion() {
    this.counter.increment();
    const currentIndex = this.counter.getValue();
    this.currentQuestion = this.questions[currentIndex];
  }

  getPreviusQuestion(){
    this.counter.decrement();
    const currentIndex = this.counter.getValue();
    this.currentQuestion = this.questions[currentIndex];
  }

  getAnswers(){
    const correct = this.currentQuestion.correct_answer
    const incorrect = this.currentQuestion.incorrect_answers
    const answers = [...incorrect,correct]; 
    
  }


  getResponse(){

    // fetch o XMLHttprequest ---> Promessa.then()
    this.httpClient.get('https://opentdb.com/api.php?amount=10&type=multiple')
    .subscribe((responseHttp)=>{
        console.log("subscribe",responseHttp);
        this.questions = responseHttp.results.map(this.questionFactory)
    })
    
  }

  questionFactory(item) {
    const q = new Question(
        item.category,
        item.type,
        item.difficulty,
        item.question,
        item.correct_answer,
        item.incorrect_answers
        );   
      return q;
    }
}
