import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent implements OnInit {

  show = false;
  type = 'password';
  visibility = 'visibility_off';
  loading = false;
  msgErro = '';

  recoverForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  private loginErrorNotification(err) {
    this.msgErro = err;
  }

  onSubmit() {
  }

}
