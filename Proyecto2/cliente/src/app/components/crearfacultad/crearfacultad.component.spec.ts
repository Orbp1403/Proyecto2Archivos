import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearfacultadComponent } from './crearfacultad.component';

describe('CrearfacultadComponent', () => {
  let component: CrearfacultadComponent;
  let fixture: ComponentFixture<CrearfacultadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearfacultadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearfacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
