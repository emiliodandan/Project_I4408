import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onRegister() {
    const body = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.http.post('http://127.0.0.1:8000/register/', body)
      .subscribe({
        next: (response) => {
          console.log('Registered successfully', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error during registration', error);
        }
      });
  }

  onLogin() {
    this.router.navigate(['/login']); 
  }
}
