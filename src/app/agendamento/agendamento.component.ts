import { Component, OnInit } from '@angular/core';
import { Agendamento } from '../shared/models/agendamento.model';
import { ApiService } from '../shared/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cadastroservico } from '../shared/models/cadastroservico.model';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})

export class AgendamentoComponent implements OnInit {
  servicos$: Observable<Cadastroservico[]>;
  agendamento$: Observable<Agendamento[]>;
  bsInlineValue = new Date();
  data: any;
  minDate = new Date();
  horarioInput: string;
  msg = false;

  angendamentoForm = this.fb.group({
    id: [undefined],
    nome: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    servico: ['', [Validators.required]],
    data: [''],
    horario: ['']
  });


  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.minDate.setDate(this.minDate.getDate()); // desabilita datas anteriores
  }

  ngOnInit() {
    this.servicos$ = this.apiService.getServicos();
    this.agendamento$ = this.apiService.getAgendamentos();
  }

  onValueChange(value: Date): void {
    this.data = this.datePipe.transform(value, 'dd/MM/yyyy');
  }

  changeInput(event) {
    this.horarioInput = event.target.value;
  }

  onSubmit() {
    const a: Agendamento = this.angendamentoForm.value;
    if (!a.id) {
      this.angendamentoForm.value.data = this.data;
      this.angendamentoForm.value.horario = this.horarioInput;
      this.addAgendamento(a);
      this.msg = true;
    }
  }

  addAgendamento(a: Agendamento) {
    this.apiService.addAgendamento(a)
      .then(() => {
        setTimeout(() => {
          this.router.navigateByUrl('/lista-agendamentos');
        }, 2000);
      });
  }

}
