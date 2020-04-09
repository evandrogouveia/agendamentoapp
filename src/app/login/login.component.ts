import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  show = false;
  type = 'password';
  visibility = 'visibility_off';

  loginForm: FormGroup = this.fb.group({
    'email' : ['', [Validators.required, Validators.email]],
    'password' : ['', [Validators.required, Validators.minLength(6)]]
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
    console.log('Preencha o formulário');
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.login(email, password)
      .subscribe(
        (u) => {
          this.router.navigateByUrl('/agendamento');
        },
        (err) => {
          this.loginErrorNotification(err);
        }
      );
  }

  loginGoogle() {
    this.authService.loginGoogle()
      .subscribe(
        (u) => {
          this.router.navigateByUrl('/agendamento');
        },
        (err) => {
          this.loginErrorNotification(err);
        }
      );
  }

}
