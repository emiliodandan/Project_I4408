import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meeting',
  imports: [FormsModule, CommonModule],
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  meetings: any[] = [];
  filteredMeetings: any[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchMeetings();
  }

  fetchMeetings(): void {
    this.loading = true;
    this.error = null;
  
    this.http.get<any>('http://127.0.0.1:8000/meetings/').subscribe({
      next: (response) => {
        this.loading = false;
        if (response && response.meetings) {
          this.meetings = response.meetings;
          this.filteredMeetings = [...this.meetings];
        } else {
          this.error = 'No meetings found or an error occurred.';
        }
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Error fetching meetings: ' + error.message;
        console.error('Error fetching meetings:', error);
      }
    });
  }

  goToAddMeeting(): void {
    this.router.navigate(['/add-meeting']);
  }

  editMeeting(meetingId: string): void {
    this.router.navigate(['/update-meeting/', meetingId]);
  }
  

  deleteMeeting(meetingId: string): void {
    if (confirm('Are you sure you want to delete this meeting?')) {
      this.http.delete(`http://127.0.0.1:8000/meetings/delete/${meetingId}/`).subscribe({
        next: () => {
          this.meetings = this.meetings.filter((meeting) => meeting.id !== meetingId);
        },
        error: (error) => {
          console.error('Error deleting meeting:', error);
        }
      });
    }
  }

  onSearch(): void {
    if (this.searchTerm === '') {
      this.filteredMeetings = [...this.meetings];
    } else {
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
  
      this.filteredMeetings = this.meetings.filter(meeting => {
        const titleMatch = meeting.title.toLowerCase().includes(lowerCaseSearchTerm);
        const notesMatch = meeting.notes ? meeting.notes.toLowerCase().includes(lowerCaseSearchTerm) : false;
        const scheduleAtMatch = meeting.scheduleat ? meeting.scheduleat.toString().toLowerCase().includes(lowerCaseSearchTerm) : false;
        return titleMatch || notesMatch || scheduleAtMatch;
      });
      console.log('Filtered Meetings:', this.filteredMeetings);
    }
  }
  

  onLogo() {
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
