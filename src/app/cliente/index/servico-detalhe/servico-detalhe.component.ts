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
 bandeira;

  servicos$: Observable<Cadastroservico>;
  loading = false;
  bsInlineValue = null;
  selectedDate: any;
  minDate = new Date();
  horarioInput: string;
  imagesUrl = {
    imagem1 : 'assets/img/img-servicos/imagem-1.jpg',
    imagem2 : 'assets/img/img-servicos/1.jpg',
    imagem3 : 'assets/img/img-servicos/2.jpg',
    imagem4 : 'assets/img/img-servicos/3.jpg',
  };

  imageClick;

  constructor(
    private apiService: ApiService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router) {}

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
  }

  changeBandeira(event) {
    this.bandeira = event.target.value;
    console.log(this.bandeira)
  }

  imgEvent(event) {
    this.imageClick = event.target.src;
  }

  next() {
    ++this.selectedIndex;
  }
  prev() {
    --this.selectedIndex;
  }
}
