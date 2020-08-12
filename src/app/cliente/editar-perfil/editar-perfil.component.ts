import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/models/user';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  usuario$: Observable<Usuario>;

  cadastroUserForm: FormGroup = this.fb.group({
    'id': [''],
    'nome': ['', [Validators.required] ],
    'sobrenome': ['', [Validators.required] ],
    'email': ['', [Validators.required, Validators.email]],
    'telefone': [''],
    'password': ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute, 
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    const usuarioId: string = this.route.snapshot.paramMap.get('id');
    this.usuario$ = this.apiService.getUsuarioDetalhe(usuarioId).valueChanges();

    this.usuario$.subscribe(data => {
      console.log(data)
      this.cadastroUserForm.setValue({
        id: data.id,
        nome: data.nome,
        sobrenome: data.sobrenome,
        email: data.email,
        telefone: data.telefone,
        password: JSON.parse(data.password.toString())
      });
    });
    
  }


}
