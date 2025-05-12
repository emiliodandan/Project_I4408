import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientComponent } from './view-client.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ViewClientComponent', () => {
  let component: ViewClientComponent;
  let fixture: ComponentFixture<ViewClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewClientComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }) // <-- mock client ID
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ViewClientComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
