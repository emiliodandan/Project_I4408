import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientComponent } from './add-client.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AddClientComponent', () => {
  let component: AddClientComponent;
  let fixture: ComponentFixture<AddClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddClientComponent, HttpClientTestingModule],
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

    fixture = TestBed.createComponent(AddClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
