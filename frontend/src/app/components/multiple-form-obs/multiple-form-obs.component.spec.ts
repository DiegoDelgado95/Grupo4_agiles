import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleFormOBSComponent } from './multiple-form-obs.component';

describe('MultipleFormOBSComponent', () => {
  let component: MultipleFormOBSComponent;
  let fixture: ComponentFixture<MultipleFormOBSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleFormOBSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleFormOBSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
