import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/models/user';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/login/auth/auth.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  usuario$: Observable<Usuario>;
  imagemSrc = 'assets/img/juliana.jpg';

  updateUserForm: FormGroup = this.fb.group({
    'id': [''],
    'nome': ['', [Validators.required]],
    'sobrenome': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'telefone': [''],
    'password': [''],
  });

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    const usuarioId: string = this.route.snapshot.paramMap.get('id');
    this.usuario$ = this.apiService.getUsuarioDetalhe(usuarioId).valueChanges();

    this.usuario$.subscribe(data => {
      this.updateUserForm.setValue(data);
    });

  }

  updateUsuario(u: Usuario) {
    let a  = this.updateUserForm.value;

    this.authService.updateUsuario(a)
      .subscribe((u) => {
        console.log('update', u)
      },
      (err) => {
        console.log(err)
      }
    );
  }


}
