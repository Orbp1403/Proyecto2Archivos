import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarrolComponent } from './mostrarrol.component';

describe('MostrarrolComponent', () => {
  let component: MostrarrolComponent;
  let fixture: ComponentFixture<MostrarrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
