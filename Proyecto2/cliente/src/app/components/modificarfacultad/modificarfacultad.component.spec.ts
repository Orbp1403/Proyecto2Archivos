import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarfacultadComponent } from './modificarfacultad.component';

describe('ModificarfacultadComponent', () => {
  let component: ModificarfacultadComponent;
  let fixture: ComponentFixture<ModificarfacultadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarfacultadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarfacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
