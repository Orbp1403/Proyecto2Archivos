import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarcarreraComponent } from './eliminarcarrera.component';

describe('EliminarcarreraComponent', () => {
  let component: EliminarcarreraComponent;
  let fixture: ComponentFixture<EliminarcarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarcarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarcarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
