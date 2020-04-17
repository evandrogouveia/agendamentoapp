import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../shared/models/user';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  show = false;
  type = 'password';
  visibility = 'visibility_off';
  loading = false;
  msgErro = '';

  cadastroForm: FormGroup = this.fb.group({
    'nome': ['', [Validators.required] ],
    'sobrenome': ['', [Validators.required] ],
    'email': ['', [Validators.required, Validators.email]],
    'telefone': ['', [Validators.required]],
    'password': ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  toggleShow() {
    this.show = !this.show;
    if (this.show) {
      this.type = 'text';
      this.visibility = 'visibility';
    } else {
      this.type = 'password';
      this.visibility = 'visibility_off';
    }
  }

  private cadastroErrorNotification(err) {
    this.msgErro = err;
  }

  cadastroUsuario() {
    this.loading = true;
    const newUser: Usuario = {
      nome: this.cadastroForm.value.nome,
      sobrenome: this.cadastroForm.value.sobrenome,
      email: this.cadastroForm.value.email,
      telefone: this.cadastroForm.value.telefone,
      password: this.cadastroForm.value.password

    };
    this.authService.cadastro(newUser)
      .subscribe(
        (u) => {
          this.router.navigateByUrl('/login');
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );

  }

}
