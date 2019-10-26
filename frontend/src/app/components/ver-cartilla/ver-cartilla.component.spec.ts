import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCartillaComponent } from './ver-cartilla.component';

describe('VerCartillaComponent', () => {
  let component: VerCartillaComponent;
  let fixture: ComponentFixture<VerCartillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerCartillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCartillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
