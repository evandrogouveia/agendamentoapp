import { Component, OnInit } from '@angular/core';
import { Cadastroservico } from '../shared/models/cadastroservico.model';
import { ApiService } from '../shared/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, range } from 'rxjs';
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
  uploadProgress = 0;

  cadastroservicoForm = this.fb.group({
    id: [undefined],
    nomeservico: ['', [Validators.required]],
    imageUrl: [''],
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
      const ref = this.storage.ref(this.cadastroservicoForm.value.imageUrl);
      const task = ref.put(event.target.files[0]);

      task.percentageChanges().subscribe(p => {
        this.uploadProgress = p;
        if (this.uploadProgress === 100) {
          const reader = new FileReader();
          reader.onload = (e: any) => this.imgSrc = e.target.result;
          reader.readAsDataURL(event.target.files[0]);
          this.selectedImage = event.target.files[0];
        }
      });

    } else {
      this.imgSrc = 'assets/img/placeholder.jpg';
      this.selectedImage = null;
    }
  }

  onSubmit() {
    if (this.cadastroservicoForm.valid) {
      const filePath = `imagem/${this.selectedImage.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);

      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.cadastroservicoForm.value.imageUrl = url;
            const a: Cadastroservico = this.cadastroservicoForm.value;
            if (!a.id) {
              this.addServico(a);
              this.msg = true;
              setTimeout(() => {
                this.imgSrc = 'assets/img/placeholder.jpg';
                this.msg = false;
                this.uploadProgress = 0;
                this.cadastroservicoForm.reset();
              }, 2000);
            }
          });
        })
      ).subscribe();
    }
  }

  addServico(a: Cadastroservico) {
    this.apiService.addServico(a);
  }
  delete(a: Cadastroservico) {
    this.apiService.deleteServico(a);
  }

}
