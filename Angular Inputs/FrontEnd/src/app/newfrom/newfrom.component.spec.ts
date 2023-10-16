import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfromComponent } from './newfrom.component';

describe('NewfromComponent', () => {
  let component: NewfromComponent;
  let fixture: ComponentFixture<NewfromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewfromComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewfromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
