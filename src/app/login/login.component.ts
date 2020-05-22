import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../login/auth/auth.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  show = false;
  type = 'password';
  visibility = 'visibility_off';
  loading = false;
  msgErro = '';

  loginForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
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

  private loginErrorNotification(err) {
    this.msgErro = err;
  }

  onSubmit() {
    this.loading = true;
    const email = this.loginForm.value.email;
    const password = CryptoJS.SHA256(this.loginForm.value.password).toString();
    this.authService.login(email, password)
      .subscribe(
        (u) => {
          this.router.navigateByUrl('/agendamento');
          this.loading = false;
        },
        (err) => {
          this.loginErrorNotification(err);
          this.loading = false;

        }
      );
  }

  loginGoogle() {
    this.loading = true;
    this.authService.loginGoogle()
      .subscribe(
        (u) => {
          u
          this.router.navigateByUrl('/agendamento');
          this.loading = false;
        },
        (err) => {
          this.loginErrorNotification(err);
          this.loading = false;
        }
      );
  }

  loginFacebook() {
    this.loading = true;
    this.authService.loginFacebook()
      .subscribe(
        (u) => {
          this.router.navigateByUrl('/agendamento');
          this.loading = false;
        },
        (err) => {
          this.loginErrorNotification(err);
          this.loading = false;
        }
      );
  }

}
