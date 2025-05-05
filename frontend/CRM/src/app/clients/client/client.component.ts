import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients',
  imports: [CommonModule, FormsModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: any[] = []; 
  filteredClients: any[] = [];
  searchTerm: string = ''; 
  apiUrl: string = 'http://127.0.0.1:8000/clients/'; 

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.http.get<any>(this.apiUrl).subscribe(
      (response) => {
        this.clients = response.clients;  // <-- Extract the 'clients' key
        this.filteredClients = this.clients;
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  onAddClient(): void {
    this.router.navigate(['/add-client']); 
  }

  onEditClient(clientId: string): void {
    this.router.navigate(['/update-client', clientId]);
  }

  onDeleteClient(clientId: string): void {
    console.log('Deleting client with ID:', clientId);  // Log client ID
    if (confirm('Are you sure you want to delete this client?')) {
      this.http.delete(`${this.apiUrl}delete/${clientId}/`).subscribe(
        () => {
          this.clients = this.clients.filter(client => client.id !== clientId);
          this.router.navigate(['/client']);
        },
        (error) => {
          console.error('Error deleting client:', error);
        }
      );
    }
  }

  onSearch(): void {
    if (this.searchTerm === '') {
      this.filteredClients = this.clients;
    } else {
      this.filteredClients = this.clients.filter(client =>
        client.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        client.phone.includes(this.searchTerm)
      );
    }
  }

  onClientClick(clientId: string): void {
    this.router.navigate(['/client', clientId]);
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
