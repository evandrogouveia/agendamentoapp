import { Component, OnInit } from '@angular/core';
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
  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    console.log(this.selected)
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
}
