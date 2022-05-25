import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarfacultadComponent } from './eliminarfacultad.component';

describe('EliminarfacultadComponent', () => {
  let component: EliminarfacultadComponent;
  let fixture: ComponentFixture<EliminarfacultadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarfacultadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarfacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
