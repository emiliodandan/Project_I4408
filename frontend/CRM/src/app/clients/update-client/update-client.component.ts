import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {
  clientId: number = 0;

  client = {
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    description: '',
    date_added: '',
    client_file: null as File | null,
    file: '' // for preview or fallback
  };

  selectedFile: File | null = null;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.clientId = Number(this.route.snapshot.paramMap.get('clientId'));
    this.fetchClientDetails();
  }

  fetchClientDetails(): void {
    this.http.get<any>(`http://127.0.0.1:8000/clients/${this.clientId}/`).subscribe({
      next: (response) => {
        if (response.success) {
          const data = response.client;
          this.client = {
            ...data,
            date_added: new Date(data.date_added).toISOString().slice(0, 16), // For datetime-local input
            client_file: null,
            file: data.file || ''
          };
        } else {
          console.error('Error: client not found');
        }
      },
      error: (error) => {
        console.error('Error fetching client details:', error);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      this.client.client_file = this.selectedFile;
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.client.name);
    formData.append('email', this.client.email);
    formData.append('phone', this.client.phone);
    formData.append('address', this.client.address);
    formData.append('company', this.client.company);
    formData.append('description', this.client.description);
    formData.append('date_added', this.client.date_added);
  
    if (this.selectedFile) {
      formData.append('client_file', this.selectedFile, this.selectedFile.name);
    }
  
    this.http.post<any>(`http://127.0.0.1:8000/clients/update/${this.clientId}/`, formData).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Client updated successfully');
          this.router.navigate([`/client`]);
        } else {
          console.error('Update failed:', response.errors);
        }
      },
      error: (error) => {
        console.error('Error during client update:', error);
      }
    });
  }
  
}
