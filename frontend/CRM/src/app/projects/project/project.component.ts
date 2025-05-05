import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: any[] = [];
  newProject: any = { title: '', description: '', start_date: '', end_date: '', client: '' };
  selectedProject: any = null;
  modalVisible: boolean = false;
  clients: any[] = [];
  currentProject: any = {
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    status: '',
    client: null
  };
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchClients();
    this.fetchProjects();
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

  fetchProjects(): void {
    this.http.get<any>('http://127.0.0.1:8000/projects/').subscribe({
      next: (response) => {
        if (response && response.projects) {
          this.projects = response.projects;
        }
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
      }
    });
  }

  addProject(): void {
    if (!this.currentProject.title || !this.currentProject.client) return;

    const formattedProject = {
      ...this.currentProject,
      start_date: this.formatDate(this.currentProject.start_date),
      end_date: this.formatDate(this.currentProject.end_date),
      client: this.currentProject.client
    };

    this.http.post<any>('http://127.0.0.1:8000/projects/add/', formattedProject).subscribe({
      next: (response) => {
        if (response.success) {
          this.fetchProjects();
          this.closeModal();
        } else {
          console.error('Error adding project:', response.errors);
        }
      },
      error: (error) => {
        console.error('Error adding project:', error);
      }
    });
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString();
  }
  

  editProject(projectId: number): void {
    this.http.get<any>(`http://127.0.0.1:8000/projects/${projectId}/`).subscribe({
      next: (response) => {
        if (response.success) {
          this.openModal(response.project);
        }
      },
      error: (error) => {
        console.error('Error fetching project:', error);
      }
    });
  }
  

  updateProject(): void {
    if (!this.selectedProject) return;

    this.http.put<any>(`http://127.0.0.1:8000/projects/update/${this.selectedProject.id}/`, this.selectedProject).subscribe({
      next: (response) => {
        if (response.success) {
          this.fetchProjects();
          this.closeModal();
        } else {
          console.error('Error updating project:', response.errors);
        }
      },
      error: (error) => {
        console.error('Error updating project:', error);
      }
    });
  }

  updateProjectStatus(project: any): void {
    const updatedProject = { ...project }; 
    updatedProject.status = project.status;
  
    this.http.put<any>(`http://127.0.0.1:8000/projects/update/${project.id}/`, updatedProject).subscribe({
      next: (response) => {
        if (response.success) {
          console.log(`Project ${project.id} status updated successfully`);
          this.fetchProjects(); 
        } else {
          console.error('Error updating project:', response.errors);
        }
      },
      error: (error) => {
        console.error('Error updating status:', error);
      }
    });
  }
  
  
  deleteProject(projectId: number): void {
    this.http.delete<any>(`http://127.0.0.1:8000/projects/delete/${projectId}/`).subscribe({
      next: (response) => {
        if (response.success) {
          this.fetchProjects();
        } else {
          console.error('Error deleting project:', response.error);
        }
      },
      error: (error) => {
        console.error('Error deleting project:', error);
      }
    });
  }

  getClientNameById(clientId: number): string {
    const client = this.clients.find(c => c.id === clientId);
    return client ? client.name : 'Unknown Client';
  }
  
  openModal(project: any = null): void {
    if (project) {
      this.selectedProject = { ...project };
    } else {
      this.selectedProject = null;
    }
    this.currentProject = this.selectedProject || {
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      client: ''
    };
    this.modalVisible = true;
  }
  closeModal(): void {
    this.modalVisible = false;
    this.selectedProject = null;
    this.newProject = { title: '', description: '', start_date: '', end_date: '', client: '', status:'' };
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
