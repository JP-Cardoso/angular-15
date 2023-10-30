import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtsCardComponent } from './debts-card.component';

describe('DebtsCardComponent', () => {
  let component: DebtsCardComponent;
  let fixture: ComponentFixture<DebtsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebtsCardComponent]
    });
    fixture = TestBed.createComponent(DebtsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
