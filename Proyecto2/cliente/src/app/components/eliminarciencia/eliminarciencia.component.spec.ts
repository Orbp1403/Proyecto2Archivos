import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarcienciaComponent } from './eliminarciencia.component';

describe('EliminarcienciaComponent', () => {
  let component: EliminarcienciaComponent;
  let fixture: ComponentFixture<EliminarcienciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarcienciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarcienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
