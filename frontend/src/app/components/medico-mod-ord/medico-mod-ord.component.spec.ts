import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoModOrdComponent } from './medico-mod-ord.component';

describe('MedicoModOrdComponent', () => {
  let component: MedicoModOrdComponent;
  let fixture: ComponentFixture<MedicoModOrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoModOrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoModOrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
