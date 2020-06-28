import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Cadastroservico } from 'src/app/shared/models/cadastroservico.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Agendamento } from 'src/app/shared/models/agendamento.model';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/login/auth/auth.service';


@Component({
  selector: 'app-servico-detalhe',
  templateUrl: './servico-detalhe.component.html',
  styleUrls: ['./servico-detalhe.component.css']
})
export class ServicoDetalheComponent implements OnInit {
  items = [1, 2, 3];
  selectedIndex = 0;

  breadcrumbs = [];

  formaPagamento = 'cartao';
  bandeira;
  numeroAgendamento: number;

  servicos$: Observable<Cadastroservico>;
  agendamento$: Observable<Agendamento[]>;

  usuarioLogado: any = [];
  loading = false;

  bsInlineValue = null;
  selectedDate: any;
  minDate = new Date();

  horarioInput: string;
  servicoInput: any = [];
  pagamentoInput: any = [];

  /*imagesUrl = {
    imagem1: 'assets/img/img-servicos/imagem-1.jpg',
    imagem2: 'assets/img/img-servicos/1.jpg',
    imagem3: 'assets/img/img-servicos/2.jpg',
    imagem4: 'assets/img/img-servicos/3.jpg',
  };*/

  imageClick;

  angendamentoForm = this.fb.group({
    id: [undefined],
    nome: [''],
    sobrenome: [''],
    email: [''],
    telefone: [''],
    servico: ['', [Validators.required]],
    data: ['', [Validators.required]],
    horario: ['', [Validators.required]],
    pagamento: ['', [Validators.required]],
    numeroagendamento: ['']
  });


  constructor(
    private apiService: ApiService,
    private datePipe: DatePipe,
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    const servicoId: string = this.route.snapshot.paramMap.get('id');
    this.servicos$ = this.apiService.getServicoDetalhe(servicoId).valueChanges();

    this.servicos$.subscribe(data => {
      this.servicoInput.push(data);
    });

    this.authService.getUser().subscribe(data => {
      this.usuarioLogado = data;
    });

    this.agendamento$ = this.apiService.getAgendamentos();
    this.agendamento$.subscribe(data => {
      this.numeroAgendamento = data.length + 1;
    });
  }

  onValueChange(event: Date): void {
    this.selectedDate = this.datePipe.transform(event, 'dd/MM/yyyy');
    if (this.selectedDate) {
      this.next();
    }
  }

  changeHorario(event) {
    this.horarioInput = event.target.value;
    if (this.horarioInput) {
      this.next();
    }
  }

  changePagamento(event) {
    this.formaPagamento = event.target.value;
    this.bandeira = '';
  }

  changeBandeira(event) {
    this.bandeira = event.target.value;
  }

  imgEvent(event) {
    this.imageClick = event.target.src;
  }

  crumbsEvent(event) {
    this.selectedIndex = Number(event.target.id);
    this.breadcrumbs.splice(this.selectedIndex, 2);
  }

  next() {
    ++this.selectedIndex;
    this.breadcrumbs.push(this.selectedIndex);
  }
  prev() {
    if (this.selectedIndex !== 0) {
      --this.selectedIndex;
      this.breadcrumbs.splice(this.selectedIndex, 1);
      this.bandeira = '';
    }
  }

  onSubmit() {
    if (!this.usuarioLogado) {
      this.router.navigateByUrl('login');
    } else {
      this.loading = true;
      this.pagamentoInput.push({ formapagamento: this.formaPagamento, bandeira: this.bandeira });
      const a: Agendamento = this.angendamentoForm.value;
      if (!a.id) {
        this.angendamentoForm.value.nome = this.usuarioLogado.nome;
        this.angendamentoForm.value.sobrenome = this.usuarioLogado.sobrenome;
        this.angendamentoForm.value.email = this.usuarioLogado.email;
        this.angendamentoForm.value.telefone = this.usuarioLogado.telefone;
        this.angendamentoForm.value.data = this.selectedDate;
        this.angendamentoForm.value.horario = this.horarioInput;
        this.angendamentoForm.value.servico = this.servicoInput;
        this.angendamentoForm.value.pagamento = this.pagamentoInput;
        this.angendamentoForm.value.numeroagendamento = this.numeroAgendamento;
        this.addAgendamento(a);
        this.angendamentoForm.reset();
      }

    }

  }

  addAgendamento(a: Agendamento) {
    this.apiService.addAgendamento(a)
      .then(() => {
        setTimeout(() => {
          this.router.navigateByUrl('sucesso');
        }, 2000);
      });
  }
}
