import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearrespuestaComponent } from './crearrespuesta.component';

describe('CrearrespuestaComponent', () => {
  let component: CrearrespuestaComponent;
  let fixture: ComponentFixture<CrearrespuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearrespuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearrespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
