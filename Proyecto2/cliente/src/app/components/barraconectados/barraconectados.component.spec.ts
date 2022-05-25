import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraconectadosComponent } from './barraconectados.component';

describe('BarraconectadosComponent', () => {
  let component: BarraconectadosComponent;
  let fixture: ComponentFixture<BarraconectadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraconectadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraconectadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
