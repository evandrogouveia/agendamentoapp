import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Agendamento } from '../shared/agendamento.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-lista-agendamento',
  templateUrl: './lista-agendamento.component.html',
  styleUrls: ['./lista-agendamento.component.css']
})
export class ListaAgendamentoComponent implements OnInit {
  agendamento$: Observable<Agendamento[]>;
  dataAtual = new Date();

  dia = this.dataAtual.toLocaleDateString();
  mes = this.dataAtual.getMonth();

  totalAgendamentoDia: number;
  totalAgendamentoMes: number;

  title = '';
  type = 'PieChart';
  data = [];
  columnNames = ['Browser', 'Percentage'];
  options = {
    pieHole: 0.4,
    chartArea: { left: 0, top: 20, width: '100%', height: '90%' },
    tooltip: { trigger: 'none' }
  };
  width = 380;
  height = 170;

  constructor(private apiService: ApiService, private afs: AngularFirestore) {}

  ngOnInit() {
    this.agendamento$ = this.apiService.getAgendamentos();
    this.totalDia();
    this.totalMes();
    this.categorias();
  }

  totalDia() {
    this.agendamento$.pipe(
      map(values => {
        let b: any;
        b = values.map(d => d.data);
        const c = b.map(da => da.toDate().toLocaleDateString());
        const s = c.filter(dat => dat === this.dia);
        this.totalAgendamentoDia = s.length;
      })
    ).subscribe();
  }

  totalMes() {
    this.agendamento$.pipe(
      map(values => {
        let b: any;
        b = values.map(d => d.data);
        const c = b.map(da => da.toDate().getMonth());
        const s = c.filter(dat => dat === this.mes);
        this.totalAgendamentoMes = s.length;
      })
    ).subscribe();
  }

  categorias() {
    this.agendamento$.subscribe(data => {
      const corteMasculino = data.map(d => d.servico).filter(dat => dat.split('Masculino').length - 1);
      const total1 = corteMasculino.length;

      const corteFeminino = data.map(d => d.servico).filter(dat => dat.split('Feminino').length - 1);
      const total2 = corteFeminino.length;

      const coloracao = data.map(d => d.servico).filter(dat => dat.split('Coloração').length - 1);
      const total3 = coloracao.length;

      const designSobrancelhas = data.map(d => d.servico).filter(dat => dat.split('Design de Sobrancelhas').length - 1);
      const total4 = designSobrancelhas.length;

      const escovaCabelosCurtos = data.map(d => d.servico).filter(dat => dat.split('Escova Cabelos Curtos').length - 1);
      const total5 = escovaCabelosCurtos.length;

      const escovaCabelosLongos = data.map(d => d.servico).filter(dat => dat.split('Escova Cabelos Longos').length - 1);
      const total6 = escovaCabelosLongos.length;

      const maquiagem = data.map(d => d.servico).filter(dat => dat.split('Maquiagem').length - 1);
      const total7 = maquiagem.length;

      const hidratacao = data.map(d => d.servico).filter(dat => dat.split('Hidratação').length - 1);
      const total8 = hidratacao.length;

      const penteadosFestas = data.map(d => d.servico).filter(dat => dat.split('Penteados Para Festas').length - 1);
      const total9 = penteadosFestas.length;

      this.data = [
        ['Corte Masculino', total1],
        ['Corte Feminino', total2],
        ['Coloração', total3],
        ['Design de Sobrancelhas', total4],
        ['Escova Cabelos Curtos', total5],
        ['Escova Cabelos Longos', total6],
        ['Maquiagem', total7],
        ['Hidratação', total8],
        ['Penteados Para Festas', total9],
      ];

    });

  }

}
