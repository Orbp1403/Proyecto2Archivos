import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrartemaComponent } from './mostrartema.component';

describe('MostrartemaComponent', () => {
  let component: MostrartemaComponent;
  let fixture: ComponentFixture<MostrartemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrartemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrartemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
