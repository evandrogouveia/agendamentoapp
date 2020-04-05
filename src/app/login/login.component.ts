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
  private loginErrorNotification(err) {
    console.log('Preencha o formulário')
  }

  onSubmit() {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
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

}
