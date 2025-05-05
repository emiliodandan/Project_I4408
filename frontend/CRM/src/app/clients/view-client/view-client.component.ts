import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {
  clientId: string = '';
  client: any = {
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    description: '',
    date_added: '',
    file: ''
  };
  errorMessage: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.clientId = params['id'];
      this.getClientDetails();
    });
  }

  getClientDetails(): void {
    this.http.get(`http://127.0.0.1:8000/clients/${this.clientId}/`).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.client = response.client;
          console.log('Client details:', this.client);
        } else {
          this.errorMessage = 'Client not found!';
        }
      },
      error: (error) => {
        console.error('Error fetching client details', error);
        this.errorMessage = 'An error occurred while fetching client details.';
      }
    });
  }

  openFile(): void {
    if (this.client.file) {
      window.open(this.client.file, '_blank');
    } else {
      this.errorMessage = 'No file available for this client.';
      console.error('No client file available.');
    }
  }
}
