import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Cadastroservico } from 'src/app/shared/models/cadastroservico.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-servico-detalhe',
  templateUrl: './servico-detalhe.component.html',
  styleUrls: ['./servico-detalhe.component.css']
})
export class ServicoDetalheComponent implements OnInit {
  items = [1, 2, 3];
  selectedIndex = 0;
  formaPagamento = 'cartao';
  breadcrumbs = [];
  bandeira;

  servicos$: Observable<Cadastroservico>;
  loading = false;
  bsInlineValue = null;
  selectedDate: any;
  minDate = new Date();
  horarioInput: string;
  imagesUrl = {
    imagem1: 'assets/img/img-servicos/imagem-1.jpg',
    imagem2: 'assets/img/img-servicos/1.jpg',
    imagem3: 'assets/img/img-servicos/2.jpg',
    imagem4: 'assets/img/img-servicos/3.jpg',
  };

  imageClick;


  constructor(
    private apiService: ApiService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const servicoId: string = this.route.snapshot.paramMap.get('id');
    this.servicos$ = this.apiService.getServicoDetalhe(servicoId).valueChanges();
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
    if(this.selectedIndex !== 0){
    --this.selectedIndex;
    this.breadcrumbs.splice(this.selectedIndex, 1);
    this.bandeira = '';
    }
  }
}
