import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Agendamento } from '../shared/agendamento.model';
import { ApiService } from '../shared/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cadastroservico } from '../shared/cadastroservico.model';


@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})

export class AgendamentoComponent implements OnInit {
  servicos$: Observable<Cadastroservico[]>;
  agendamento$: Observable<Agendamento[]>;
  bsInlineValue = new Date();
  data: Date;
  minDate: Date;
  horarioInput: string;
  msg = false;
  vs: any;

  angendamentoForm = this.fb.group({
    id: [undefined],
    nome: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    servico: ['', [Validators.required]],
    data: [''],
    horario: ['']
  });

  horarios: any[] = [
    '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30',
    '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
  ];

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
  }

  ngOnInit() {
    this.servicos$ = this.apiService.getServicos();
    this.agendamento$ = this.apiService.getAgendamentos();

    this.agendamento$.pipe(
      map(values => {
        let b: any;
        b = values.map(d => d.horario);
        console.log(b.filter(c => c ))
        console.log(this.horarios)
      })
    ).subscribe();
  }

  onValueChange(value: Date): void {
    this.data = value;
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
