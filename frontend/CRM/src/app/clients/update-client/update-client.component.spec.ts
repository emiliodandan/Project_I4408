import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateClientComponent } from './update-client.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';

describe('UpdateClientComponent', () => {
  let component: UpdateClientComponent;
  let fixture: ComponentFixture<UpdateClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateClientComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'clientId') return '10'; // Mocked client ID
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

    fixture = TestBed.createComponent(UpdateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set clientId from route params', () => {
    expect(component.clientId).toBe(10);
  });
});
