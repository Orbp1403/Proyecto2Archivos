import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarcarreraComponent } from './mostrarcarrera.component';

describe('MostrarcarreraComponent', () => {
  let component: MostrarcarreraComponent;
  let fixture: ComponentFixture<MostrarcarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarcarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarcarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
