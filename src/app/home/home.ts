import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Feedback{
  name: string;
  title: string;
  message:string;
}

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  showToast=false;
@ViewChild('feedbackSlider', { static: false }) feedbackSlider!: ElementRef;
  feedback: Feedback[]=[]
http = inject(HttpClient)
  ngOnInit(): void {
    this.GetFeedback();
  }

  GetFeedback(){
    debugger
    this.http.get<Feedback[]>("https://api-portfolio-ashraful.runasp.net/api/Feedback/getfeedback").subscribe({
      next:(res: Feedback[])=>{
        debugger
        this.feedback = res;
      },
      error:(err)=>{
        console.error("Failed to load feedback",err);
      }
    })
  }
scrollSlider(direction: number) {
    const el = this.feedbackSlider.nativeElement;
    const cardWidth = 320; // approx. card width + gap (adjust if needed)
    el.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  }

  scrollToContact(obj: string): void{
    const element = document.getElementById(obj);
    if(element){
      element.scrollIntoView({behavior:'smooth'});
    }
  }
@ViewChild('skills') skillsSection!: ElementRef;

ngAfterViewInit() {
  const section = this.skillsSection.nativeElement as HTMLElement;
  const bars = section.querySelectorAll('.bar > i');
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      bars.forEach((bar) => {
        const barEl = bar as HTMLElement;
        const percent = barEl.getAttribute('data-width');
        if (percent) {
          barEl.style.width = percent + '%';
        }
      });
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  observer.observe(section);
}

downloadCV(){
  const link = document.createElement('a');
  link.href = 'assets/Document/CV (1).pdf';
  link.download ='Ashraful_Anam_Alve_CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// emailForm : FormGroup = new FormGroup({
//   name: new FormControl(""),
//   email: new FormControl(""),
//   subject: new FormControl(""),
//   message: new FormControl("")
// })

// sendMessage(){
//   const formdata = this.emailForm.value;

//   this.http.post("https://localhost:7189/api/EnquaryMaster/sendEmail",formdata,{responseType:'text'}).subscribe({
//     next:(res: any)=>{
//       alert("Thank you for your message");
//       this.emailForm.reset();
//     },
//     error:(err)=>{
//       console.error(err);
//       alert("Something went wrong");
//     }
//   });
// }

onEmail(){
 this.showToast=true;
 setTimeout(() => {
  this.showToast=false;
 }, 6000);
}



}
