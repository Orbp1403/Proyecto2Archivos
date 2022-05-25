import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarfacultadComponent } from './mostrarfacultad.component';

describe('MostrarfacultadComponent', () => {
  let component: MostrarfacultadComponent;
  let fixture: ComponentFixture<MostrarfacultadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarfacultadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarfacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
