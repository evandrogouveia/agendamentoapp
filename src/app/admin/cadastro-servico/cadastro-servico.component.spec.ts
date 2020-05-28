import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroServicoComponent } from './cadastro-servico.component';

describe('CadastroServicoComponent', () => {
  let component: CadastroServicoComponent;
  let fixture: ComponentFixture<CadastroServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
