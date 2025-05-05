import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) { }
  onLogo(){
    this.router.navigate(['/']);
  }
  onClients() {
    this.router.navigate(['/client']);
  }
  onMeetings() {
    this.router.navigate(['/meeting']);
  }
  onNotes() {
    this.router.navigate(['/note']);
  }
  onProjects() {
    this.router.navigate(['/project']);
  }
  onTasks(){
    this.router.navigate(['/task'])
  }
  onLogout() {
    this.router.navigate(['/login']);
  }
}