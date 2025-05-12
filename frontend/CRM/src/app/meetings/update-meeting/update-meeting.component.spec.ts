import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateMeetingComponent } from './update-meeting.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('UpdateMeetingComponent', () => {
  let component: UpdateMeetingComponent;
  let fixture: ComponentFixture<UpdateMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMeetingComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'meetingId') return '5'; // mock meeting ID
                  return null;
                }
              }
            }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set meetingId from route param', () => {
    expect(component.meetingId).toBe(5);
  });
});
