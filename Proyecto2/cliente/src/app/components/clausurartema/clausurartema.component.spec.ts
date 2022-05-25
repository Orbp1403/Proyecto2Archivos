import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClausurartemaComponent } from './clausurartema.component';

describe('ClausurartemaComponent', () => {
  let component: ClausurartemaComponent;
  let fixture: ComponentFixture<ClausurartemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClausurartemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClausurartemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
