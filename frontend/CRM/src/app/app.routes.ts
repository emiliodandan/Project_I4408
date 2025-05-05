import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './clients/client/client.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { UpdateClientComponent } from './clients/update-client/update-client.component';
import { ViewClientComponent } from './clients/view-client/view-client.component';
import { MeetingComponent } from './meetings/meeting/meeting.component';
import { AddMeetingComponent } from './meetings/add-meeting/add-meeting.component';
import { TaskComponent } from './tasks/task/task.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { ProjectComponent } from './projects/project/project.component';
import { NoteComponent } from './notes/note/note.component';
import { UpdateTaskComponent } from './tasks/update-task/update-task.component';
import { UpdateMeetingComponent } from './meetings/update-meeting/update-meeting.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'home', component: HomeComponent},
  {path: 'client',component: ClientComponent},
  {path: 'add-client', component: AddClientComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'update-client/:clientId', component: UpdateClientComponent },
  { path: 'client/:id', component: ViewClientComponent },
  {path: 'meeting', component: MeetingComponent},
  {path: 'add-meeting', component: AddMeetingComponent},
  {path: 'task', component: TaskComponent},
  {path: 'add-task', component: AddTaskComponent},
  {path: 'update-task/:taskId', component: UpdateTaskComponent},
  {path: 'project', component: ProjectComponent},
  {path: 'note', component: NoteComponent},
  {path: 'update-meeting/:meetingId', component:UpdateMeetingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }