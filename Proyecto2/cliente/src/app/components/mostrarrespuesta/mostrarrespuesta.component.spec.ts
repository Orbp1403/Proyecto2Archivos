import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarrespuestaComponent } from './mostrarrespuesta.component';

describe('MostrarrespuestaComponent', () => {
  let component: MostrarrespuestaComponent;
  let fixture: ComponentFixture<MostrarrespuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarrespuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarrespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
