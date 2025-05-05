import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  taskId: number = 0;

  task = {
    title: '',
    description: '',
    due_date: '',
    completed: false
  };

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('taskId');
  
    if (!idParam || isNaN(Number(idParam))) {
      console.error('Invalid or missing task ID in the URL');
      this.router.navigate(['/task']);
      return;
    }

    this.taskId = Number(idParam);
    this.fetchTaskDetails();
  }

  fetchTaskDetails(): void {
    this.http.get<any>(`http://127.0.0.1:8000/tasks/${this.taskId}/`).subscribe({
      next: (response) => {
        if (response.success) {
          const data = response.task;
          this.task = {
            ...data,
            due_date: new Date(data.due_date).toISOString().substring(0, 16)
          };
        } else {
          console.error('Error: Task not found');
        }
      },
      error: (error) => {
        console.error('Error fetching task details:', error);
      }
    });
  }

  onSubmit(): void {
    const updatedTask = {
      title: this.task.title,
      description: this.task.description,
      due_date: this.task.due_date,
      completed: this.task.completed
    };
    
    this.http.put<any>(`http://127.0.0.1:8000/tasks/update/${this.taskId}/`, updatedTask)
    .subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Task updated successfully');
          this.router.navigate(['/task']);
        } else {
          console.error('Update failed:', response.errors);
        }
      },
      error: (error) => {
        console.error('Error during task update:', error);
      }
    });
  }
}
