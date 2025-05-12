import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteComponent } from './note.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteComponent, HttpClientTestingModule],
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

    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
