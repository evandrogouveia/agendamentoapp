import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/models/user';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/login/auth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  usuario$: Observable<Usuario>;
  imagemSrc = 'assets/img/icons/user-empty.svg';
  selectedImage: any = null;
  loading = false;

  updateUserForm: FormGroup = this.fb.group({
    'avatar': [''],
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
    private storage: AngularFireStorage,
    private ng2ImgMax: Ng2ImgMaxService
  ) { }

  ngOnInit() {
    const usuarioId: string = this.route.snapshot.paramMap.get('id');
    this.usuario$ = this.apiService.getUsuarioDetalhe(usuarioId).valueChanges();

    this.usuario$.subscribe(data => {
      this.updateUserForm.setValue(data);
      data.avatar ? this.imagemSrc = data.avatar : this.imagemSrc = this.imagemSrc;
    });

  }

  showPreviewImagem(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagemSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);

      let image = event.target.files[0];
    
      this.ng2ImgMax.resizeImage(image, 150, 150).subscribe(
        result => {
          console.log(result)
          this.selectedImage = result;
        },
        error => {
          console.log('erro no upload!', error);
        });
    } else {
      this.imagemSrc = 'assets/img/icons/user-empty.svg';
      this.selectedImage = null;
    }
  }

  updateUsuario() {
    this.loading = true;
    this.update();

    if (this.selectedImage) {
      const filePath = `imagem-perfil/${this.selectedImage.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);

      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.updateUserForm.value.avatar = url;

            this.update();
            this.loading = false;
          });
        })
      ).subscribe();
    }

  }

  update() {
    let a = this.updateUserForm.value;

    this.authService.updateUsuario(a)
      .subscribe((u) => {
        console.log('update', u)
        this.loading = false;
      },
        (err) => {
          console.log(err)
        }
      );
  }


}
