import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarcarreraComponent } from './modificarcarrera.component';

describe('ModificarcarreraComponent', () => {
  let component: ModificarcarreraComponent;
  let fixture: ComponentFixture<ModificarcarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarcarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarcarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
