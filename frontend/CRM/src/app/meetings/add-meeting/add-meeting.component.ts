import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-meeting',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {
  clients: any[] = [];
  meeting = {
    client_id: '',
    title: '',
    notes: '',
    scheduled_at: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.http.get<any>('http://127.0.0.1:8000/clients/').subscribe({
      next: (response) => {
        console.log('Fetched clients:', response); 
        if (response.clients) {
          this.clients = response.clients;
        }
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      }
    });
  }

  onSubmit(): void {
    if (!this.meeting.client_id || !this.meeting.title || !this.meeting.scheduled_at) {
      console.error('Please fill all required fields');
      return;
    }
  
    // Format scheduled_at to "YYYY-MM-DD HH:mm:ss" (Angular default)
    const formattedDate = new Date(this.meeting.scheduled_at).toISOString().slice(0, 19).replace('T', ' ');
  
    const meetingData = {
      client: this.meeting.client_id,
      title: this.meeting.title,
      notes: this.meeting.notes,
      scheduled_at: formattedDate
    };
  
    this.http.post<any>('http://127.0.0.1:8000/meetings/add/', meetingData).subscribe({
      next: (response) => {
        console.log('Response from meeting creation:', response);
        if (response.success) {
          console.log('Meeting added successfully');
          this.router.navigate(['/meeting']);
        } else {
          console.error('Error: Could not add meeting', response.errors);
        }
      },
      error: (error) => {
        console.error('Error during meeting creation:', error);
      }
    });
  }
  
  
}
