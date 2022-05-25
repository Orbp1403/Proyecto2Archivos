import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarrolComponent } from './modificarrol.component';

describe('ModificarrolComponent', () => {
  let component: ModificarrolComponent;
  let fixture: ComponentFixture<ModificarrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
