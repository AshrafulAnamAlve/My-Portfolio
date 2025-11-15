import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  showToast = false;

  onLogin(){
    this.showToast = true;
        setTimeout(() => this.showToast = false, 6000);
        
  }
}
