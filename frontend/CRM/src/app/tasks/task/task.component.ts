import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  imports:[
    CommonModule
  ],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.http.get<any>('http://127.0.0.1:8000/tasks/').subscribe({
      next: (res) => this.tasks = res.tasks,
      error: (err) => console.error('Failed to fetch tasks', err)
    });
  }

  deleteTask(id: number): void {
    if (confirm('Delete this task?')) {
      this.http.delete(`http://127.0.0.1:8000/tasks/delete/${id}/`).subscribe({
        next: () => this.tasks = this.tasks.filter(t => t.id !== id),
        error: (err) => console.error('Failed to delete task', err)
      });
    }
  }

  toggleCompleted(task: any): void {
    const updatedValue = !task.completed;
  
    this.http.put(`http://127.0.0.1:8000/tasks/update/${task.id}/`, {
      ...task,
      completed: updatedValue
    }).subscribe({
      next: () => task.completed = updatedValue,
      error: err => console.error('Error toggling completed status:', err)
    });
  } 

  goToAddTask(): void {
    this.router.navigate(['/add-task']);
  }

  editTask(taskId: number): void {
    this.router.navigate([`/update-task/${taskId}`]);
  }  
  onLogo(): void {
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

  onTasks() {
    this.router.navigate(['/task']);
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}