import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientComponent } from './view-client.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViewClientComponent', () => {
  let component: ViewClientComponent;
  let fixture: ComponentFixture<ViewClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewClientComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
