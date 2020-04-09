import { Component, OnInit } from '@angular/core';
import { Cadastroservico } from '../shared/cadastroservico.model';
import { ApiService } from '../shared/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-cadastro-servico',
  templateUrl: './cadastro-servico.component.html',
  styleUrls: ['./cadastro-servico.component.css']
})
export class CadastroServicoComponent implements OnInit {
  servicos$: Observable<Cadastroservico[]>;
  msg = false;

  cadastroservicoForm = this.fb.group({
    id: [undefined],
    nomeservico: ['', [Validators.required]],
    valorservico: ['', [Validators.required]]
  });

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.servicos$ = this.apiService.getServicos();
  }

  onSubmit() {
    const a: Cadastroservico = this.cadastroservicoForm.value;
    if (!a.id) {
      this.addServico(a);
      this.msg = true;
      setTimeout(() => {
        this.msg = false;
        this.cadastroservicoForm.reset();
      }, 3000);
    }
  }

  addServico(a: Cadastroservico) {
    this.apiService.addServico(a);
  }
  delete(a: Cadastroservico) {
    this.apiService.deleteServico(a);
  }

}
