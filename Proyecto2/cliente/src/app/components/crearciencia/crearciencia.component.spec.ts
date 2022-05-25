import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearcienciaComponent } from './crearciencia.component';

describe('CrearcienciaComponent', () => {
  let component: CrearcienciaComponent;
  let fixture: ComponentFixture<CrearcienciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearcienciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearcienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
