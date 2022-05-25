import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarcienciaComponent } from './modificarciencia.component';

describe('ModificarcienciaComponent', () => {
  let component: ModificarcienciaComponent;
  let fixture: ComponentFixture<ModificarcienciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarcienciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarcienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
