import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCargaMedicoComponent } from './formulario-carga-medico.component';

describe('FormularioCargaMedicoComponent', () => {
  let component: FormularioCargaMedicoComponent;
  let fixture: ComponentFixture<FormularioCargaMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioCargaMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCargaMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
