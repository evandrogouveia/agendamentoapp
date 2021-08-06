import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Agendamento } from '../../../../shared/models/agendamento.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cadastroservico } from '../../../../shared/models/cadastroservico.model';


@Component({
  selector: 'app-lista-agendamento',
  templateUrl: './lista-agendamento.component.html',
  styleUrls: ['./lista-agendamento.component.css']
})
export class ListaAgendamentoComponent implements OnInit {
  agendamento$: Observable<Agendamento[]>;
  servicos$: Observable<Cadastroservico[]>;

  dataAtual = new Date();

  dia = this.dataAtual.toLocaleDateString();
  mes = this.dataAtual.toLocaleDateString().substring(3, 5);
  

  totalAgendamentoDia: number;
  totalAgendamentoMes: number;

  constructor(private apiService: ApiService, private afs: AngularFirestore) { }

  ngOnInit() {
    this.agendamento$ = this.apiService.getAgendamentos();
    this.servicos$ = this.apiService.getServicos();
    this.totalDia();
    this.totalMes();


    this.agendamento$.pipe(
      map(values => {
        const b: any = values.map(d => d.data).filter(dat => dat === this.dia);
        this.totalAgendamentoDia = b.length;
      })
    ).subscribe();

  }

  totalDia() {
    this.agendamento$.pipe(
      map(values => {
        const b: any = values.map(d => d.data).filter(dat => dat === this.dia);
        this.totalAgendamentoDia = b.length;
      })
    ).subscribe();
  }

  totalMes() {
    this.agendamento$.pipe(
      map(values => {
        const b: any = values.map(d => d.data.substring(3, 5)).filter(dat => dat === this.mes);
        this.totalAgendamentoMes = b.length;
      })
    ).subscribe();
  }

}
