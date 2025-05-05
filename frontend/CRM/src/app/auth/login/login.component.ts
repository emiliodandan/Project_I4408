import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    const body = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://127.0.0.1:8000/login/', body)
      .subscribe({
        next: (response) => {
          console.log('Logged in successfully', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error during login', error);
        }
      });
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
