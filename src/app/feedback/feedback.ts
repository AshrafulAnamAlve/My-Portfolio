import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-feedback',
  imports: [ReactiveFormsModule],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css',
})
export class Feedback {

showToast = false;
  http = inject(HttpClient);
  feedbackForm: FormGroup = new FormGroup({
    Name: new FormControl(""),
    Title: new FormControl(""),
    message: new FormControl("")
  })

  onSubmit(){
      if (this.feedbackForm.invalid) {
      alert("Please fill all fields");
      return;
    }
    const feedback = this.feedbackForm.value;
    this.http.post("https://api-portfolio-ashraful.runasp.net/api/Feedback/postfeedback",feedback,{responseType:'text'}).subscribe({
      next:(res: any)=>{
         this.showToast = true;
        setTimeout(() => this.showToast = false, 2500);
        this.feedbackForm.reset();
      },
      error:(err)=>{
        console.error(err);
        alert("something wrong");
      }
    })

  }
}
