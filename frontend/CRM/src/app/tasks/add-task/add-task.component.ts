import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  imports:[CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  task: any = {
    title: '',
    description: '',
    due_date: '',
    completed: false
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    this.http.post('http://127.0.0.1:8000/tasks/add/', this.task).subscribe({
      next: () => this.router.navigate(['/task']),
      error: (err) => console.error('Error adding task', err)
    });
  }
}