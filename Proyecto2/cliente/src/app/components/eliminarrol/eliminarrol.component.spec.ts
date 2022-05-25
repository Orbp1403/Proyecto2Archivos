import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarrolComponent } from './eliminarrol.component';

describe('EliminarrolComponent', () => {
  let component: EliminarrolComponent;
  let fixture: ComponentFixture<EliminarrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
