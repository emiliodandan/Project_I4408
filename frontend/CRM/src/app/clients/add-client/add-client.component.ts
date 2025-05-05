import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-clients',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {
  client = {
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    description: '',
    date_added: '',
    file: null as File | null // Correctly typed as File or null
  };

  selectedFile: File | null = null;
  
  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0]; 
      this.client.file = this.selectedFile;
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
  
    if (this.selectedFile) {
      formData.append('client_file', this.selectedFile, this.selectedFile.name); // Correct field name
    }
  
    this.http.post('http://127.0.0.1:8000/clients/add/', formData).subscribe({
      next: (response) => {
        console.log('Client added successfully', response);
        this.client = { name: '', email: '', phone: '', address: '', company: '', description: '', date_added: '', file: null };
        this.router.navigate(['/client']);
      },
      error: (error) => {
        console.error('Error during add client', error);
      }
    });
  }
  
}
