import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAgendamentoComponent } from './lista-agendamento.component';

describe('ListaAgendamentoComponent', () => {
  let component: ListaAgendamentoComponent;
  let fixture: ComponentFixture<ListaAgendamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAgendamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
