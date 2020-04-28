import { Component, OnInit } from '@angular/core';
import { Cadastroservico } from '../shared/models/cadastroservico.model';
import { ApiService } from '../shared/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-cadastro-servico',
  templateUrl: './cadastro-servico.component.html',
  styleUrls: ['./cadastro-servico.component.css']
})
export class CadastroServicoComponent implements OnInit {
  servicos$: Observable<Cadastroservico[]>;
  msg = false;
  imgSrc = 'assets/img/placeholder.jpg';
  selectedImage: any = null;

  cadastroservicoForm = this.fb.group({
    id: [undefined],
    nomeservico: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    valorservico: ['', [Validators.required]]
  });

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.servicos$ = this.apiService.getServicos();
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = 'assets/img/placeholder.jpg';
      this.selectedImage = null;
    }
  }

  uploadImg() {
    if (this.cadastroservicoForm.valid) {
      const filePath = `imagens/${this.selectedImage.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.cadastroservicoForm.value.imageUrl = url;
          });
        })
      ).subscribe();
    }
  }

  onSubmit() {
    const a: Cadastroservico = this.cadastroservicoForm.value;
    if (!a.id) {
      this.uploadImg();
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
