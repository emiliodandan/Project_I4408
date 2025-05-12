import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetingComponent } from './add-meeting.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AddMeetingComponent', () => {
  let component: AddMeetingComponent;
  let fixture: ComponentFixture<AddMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMeetingComponent, HttpClientTestingModule],
            providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          paramMap: of({
            get: (key: string) => 'mock-id'
          })
        }
      }
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
