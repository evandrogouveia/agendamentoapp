import { Component, OnInit, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-servico-detalhe',
  templateUrl: './servico-detalhe.component.html',
  styleUrls: ['./servico-detalhe.component.css']
})
export class ServicoDetalheComponent implements OnInit {
  bsInlineValue = null;
  selected: any;
  minDate = new Date();
  horarioInput: string;
  imagesUrl = {
    imagem1 : 'assets/img/img-servicos/imagem-1.jpg',
    imagem2 : 'assets/img/img-servicos/1.jpg',
    imagem3 : 'assets/img/img-servicos/2.jpg',
    imagem4 : 'assets/img/img-servicos/3.jpg',
  };
  image = 'assets/img/img-servicos/imagem-1.jpg';

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
  }

  onValueChange(event: Date): void {
    this.selected = this.datePipe.transform(event, 'dd/MM/yyyy');
  }

  backCalendar() {
    this.selected = null;
  }

  changeHorario(event) {
    this.horarioInput = event.target.value;
  }

  imgEvent(event) {
    this.image = event.target.src;
  }
}
