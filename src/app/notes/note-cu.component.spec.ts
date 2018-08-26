import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCUComponent } from './note-cu.component';

describe('NoteCUComponent', () => {
  let component: NoteCUComponent;
  let fixture: ComponentFixture<NoteCUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteCUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteCUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
