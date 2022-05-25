import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearcarreraComponent } from './crearcarrera.component';

describe('CrearcarreraComponent', () => {
  let component: CrearcarreraComponent;
  let fixture: ComponentFixture<CrearcarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearcarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearcarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
