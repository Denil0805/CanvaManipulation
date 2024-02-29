import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvaBoardComponent } from './canva-board.component';

describe('CanvaBoardComponent', () => {
  let component: CanvaBoardComponent;
  let fixture: ComponentFixture<CanvaBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanvaBoardComponent]
    });
    fixture = TestBed.createComponent(CanvaBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
