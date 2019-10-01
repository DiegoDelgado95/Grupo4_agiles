import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerOrdenComponent } from './ver-orden.component';

describe('VerOrdenComponent', () => {
  let component: VerOrdenComponent;
  let fixture: ComponentFixture<VerOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
