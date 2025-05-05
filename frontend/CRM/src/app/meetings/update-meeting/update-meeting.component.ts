import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-meeting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-meeting.component.html',
  styleUrls: ['./update-meeting.component.css']
})
export class UpdateMeetingComponent implements OnInit {
  meetingId: number = 0;

  meeting = {
    client: '',
    title: '',
    scheduled_at: '',
    notes: ''
  };

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('meetingId');
  
    if (!idParam || isNaN(Number(idParam))) {
      console.error('Invalid or missing meeting ID in the URL');
      this.router.navigate(['/meetings']);
      return;
    }

    this.meetingId = Number(idParam);
    this.fetchMeetingDetails();
  }

  fetchMeetingDetails(): void {
    this.http.get<any>(`http://127.0.0.1:8000/meetings/${this.meetingId}/`).subscribe({
      next: (response) => {
        if (response.success) {
          const data = response.meeting;
          this.meeting = {
            ...data,
            scheduled_at: new Date(data.scheduled_at).toISOString().substring(0, 16) // Format for input
          };
        } else {
          console.error('Error: Meeting not found');
        }
      },
      error: (error) => {
        console.error('Error fetching meeting details:', error);
      }
    });
  }

  onSubmit(): void {
    const updatedMeeting = {
      client: this.meeting.client, 
      title: this.meeting.title,
      scheduled_at: this.meeting.scheduled_at,
      notes: this.meeting.notes
    };    
    this.http.put<any>(`http://127.0.0.1:8000/meetings/update/${this.meetingId}/`, updatedMeeting)
      .subscribe({
        next: (response) => {
          console.log('Server Response:', response);
  
          if (response.success) {
            console.log('Meeting updated successfully');
            this.router.navigate(['/meeting']);
          } else {
            console.error('Update failed:', response.errors || 'No error message provided');
          }
        },
        error: (error) => {
          console.error('Error during meeting update:', error);
        }
      });
  }
}
