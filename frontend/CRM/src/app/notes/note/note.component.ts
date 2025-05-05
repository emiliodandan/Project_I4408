import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  notes: any[] = [];
  clients: any[] = [];
  newNoteContent: string = '';
  modalVisible: boolean = false;
  searchTerm: string = '';
  selectedClientForNote: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchClients();
    this.fetchNotes();
  }

  fetchClients(): void {
    this.http.get<any>('http://127.0.0.1:8000/clients/').subscribe({
      next: (response) => {
        if (response && response.clients) {
          this.clients = response.clients;
        }
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      }
    });
  }

  fetchNotes(): void {
    this.http.get<any>('http://127.0.0.1:8000/remarks/').subscribe({
      next: (response) => {
        this.notes = response.notes || response.remarks || [];
      },
      error: (error) => {
        console.error('Error fetching notes:', error);
      }
    });
  }

  addNote(): void {
    if (!this.newNoteContent.trim() || !this.selectedClientForNote) return;

    const noteData = {
      content: this.newNoteContent.trim(),
      client: this.selectedClientForNote,
    };

    this.http.post<any>('http://127.0.0.1:8000/remarks/add/', noteData).subscribe({
      next: (response) => {
        if (response.success) {
          this.newNoteContent = '';
          this.fetchNotes();
          this.closeModal();
        } else {
          console.error('Error from backend:', response.errors);
        }
      },
      error: (error) => {
        console.error('Error adding note:', error);
      }
    });
  }

  deleteNote(remarkId: number): void {
    this.http.delete<any>(`http://127.0.0.1:8000/remarks/delete/${remarkId}/`).subscribe({
      next: (response) => {
        if (response.success) {
          this.fetchNotes();
        } else {
          console.error('Error deleting note:', response.error);
        }
      },
      error: (error) => {
        console.error('Error deleting note:', error);
      }
    });
  }

  filteredNotes(): any[] {
    if (!this.searchTerm.trim()) {
      return this.notes;
    }

    const search = this.searchTerm.toLowerCase();

    return this.notes.filter(note => {
      const clientName = this.getClientNameById(note.client).toLowerCase();
      return clientName.includes(search);
    });
  }

  getClientNameById(clientId: number): string {
    const client = this.clients.find(c => c.id === clientId);
    return client ? client.name : 'Unknown Client';
  }

  openModal(): void {
    this.modalVisible = true;
  }

  closeModal(): void {
    this.modalVisible = false;
    this.newNoteContent = '';
    this.selectedClientForNote = null;
  }

  onLogo(): void {
    this.router.navigate(['/']);
  }

  onClients(): void {
    this.router.navigate(['/client']);
  }

  onMeetings(): void {
    this.router.navigate(['/meeting']);
  }

  onNotes(): void {
    this.router.navigate(['/note']);
  }

  onProjects(): void {
    this.router.navigate(['/project']);
  }

  onTasks(): void {
    this.router.navigate(['/task']);
  }

  onLogout(): void {
    this.router.navigate(['/login']);
  }
}
