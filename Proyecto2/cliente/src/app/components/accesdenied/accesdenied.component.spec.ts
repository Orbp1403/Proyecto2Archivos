import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesdeniedComponent } from './accesdenied.component';

describe('AccesdeniedComponent', () => {
  let component: AccesdeniedComponent;
  let fixture: ComponentFixture<AccesdeniedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesdeniedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesdeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
