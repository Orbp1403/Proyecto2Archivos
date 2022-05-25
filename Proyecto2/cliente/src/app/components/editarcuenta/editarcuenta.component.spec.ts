import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarcuentaComponent } from './editarcuenta.component';

describe('EditarcuentaComponent', () => {
  let component: EditarcuentaComponent;
  let fixture: ComponentFixture<EditarcuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarcuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarcuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
