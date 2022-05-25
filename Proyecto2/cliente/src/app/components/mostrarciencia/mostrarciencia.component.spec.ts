import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarcienciaComponent } from './mostrarciencia.component';

describe('MostrarcienciaComponent', () => {
  let component: MostrarcienciaComponent;
  let fixture: ComponentFixture<MostrarcienciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarcienciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarcienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
