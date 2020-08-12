import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../login/auth/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../shared/models/user';
import * as CryptoJS from 'crypto-js';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  show = false;
  type = 'password';
  visibility = 'visibility_off';
  loading = false;
  msgErro = '';

  cadastroForm: FormGroup = this.fb.group({
    'nome': ['', [Validators.required] ],
    'sobrenome': ['', [Validators.required] ],
    'email': ['', [Validators.required, Validators.email]],
    'telefone': [''],
    'password': ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
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
      telefone: '',
      password: CryptoJS.SHA256(this.cadastroForm.value.password).toString(),
    };
   
    this.authService.cadastro(newUser)
      .subscribe(
        (u) => {
          this.router.navigateByUrl('/index');
          this.loading = false;
        },
        (err) => {
          if (err.code === 'auth/email-already-in-use') {
            this.loading = false;
            this.msgErro = 'Email já cadastrado';
          } else {
          this.msgErro = 'Preencha os campos corretamente';
          this.loading = false;
          }
        }
      );

  }

}
