import { Component, OnInit } from '@angular/core';
import { Cadastroservico } from '../../../../shared/models/cadastroservico.model';
import { ApiService } from '../../../../shared/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-register-salon-service',
  templateUrl: './register-salon-service.component.html',
  styleUrls: ['./register-salon-service.component.scss']
})
export class RegisterSalonServiceComponent implements OnInit {
  servicos$: Observable<Cadastroservico[]>;
  msg = false;
  imagemUmSrc = 'assets/img/placeholder.jpg';
  imagemDoisSrc = 'assets/img/placeholder.jpg';
  imagemTresSrc = 'assets/img/placeholder.jpg';
  imagemQuatroSrc = 'assets/img/placeholder.jpg';
  selectedImageOne: any = null;
  selectedImageTwo: any = null;
  selectedImageThree: any = null;
  selectedImageFour: any = null;

  uploadProgress = 0;
  textbtn = 'Cadastrar';

  cadastroservicoForm = this.fb.group({
    id: [undefined],
    nomeservico: ['', [Validators.required]],
    imagem1: [''],
    imagem2: [''],
    imagem3: [''],
    imagem4: [''],
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
  showPreviewImagemUm(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagemUmSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImageOne = event.target.files[0];
    } else {
      this.imagemUmSrc = 'assets/img/placeholder.jpg';
      this.selectedImageOne = null;
    }
  }

  showPreviewImagemDois(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagemDoisSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImageTwo = event.target.files[0];
    } else {
      this.imagemDoisSrc = 'assets/img/placehold.er.jpg';
      this.selectedImageTwo = null;
    }
  }

  showPreviewImagemTres(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagemTresSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImageThree = event.target.files[0];
    } else {
      this.imagemTresSrc = 'assets/img/placeholder.jpg';
      this.selectedImageThree = null;
    }
  }

  showPreviewImagemQuatro(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagemQuatroSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImageFour = event.target.files[0];
    } else {
      this.imagemQuatroSrc = 'assets/img/placeholder.jpg';
      this.selectedImageFour = null;
    }
  }

  onSubmit() {
    this.textbtn = 'Carregando...';

    let a: Cadastroservico = this.cadastroservicoForm.value;
    if (!a.id) {
      if (this.cadastroservicoForm.valid) {
        const filePathOne = `imagem/${this.selectedImageOne.name}_${new Date().getTime()}`;
        const fileRefOne = this.storage.ref(filePathOne);

        const filePathTwo = `imagem/${this.selectedImageTwo.name}_${new Date().getTime()}`;
        const fileRefTwo = this.storage.ref(filePathTwo);

        const filePathThree = `imagem/${this.selectedImageThree.name}_${new Date().getTime()}`;
        const fileRefThree = this.storage.ref(filePathThree);

        const filePathFour = `imagem/${this.selectedImageFour.name}_${new Date().getTime()}`;
        const fileRefFour = this.storage.ref(filePathFour);

        this.storage.upload(filePathTwo, this.selectedImageTwo).snapshotChanges().pipe(
          finalize(() => {
            fileRefTwo.getDownloadURL().subscribe((url) => {
              this.cadastroservicoForm.value.imagem2 = url;
            });
          })
        ).subscribe();

        this.storage.upload(filePathThree, this.selectedImageThree).snapshotChanges().pipe(
          finalize(() => {
            fileRefThree.getDownloadURL().subscribe((url) => {
              this.cadastroservicoForm.value.imagem3 = url;
            });
          })
        ).subscribe();

        this.storage.upload(filePathFour, this.selectedImageFour).snapshotChanges().pipe(
          finalize(() => {
            fileRefFour.getDownloadURL().subscribe((url) => {
              this.cadastroservicoForm.value.imagem4 = url;
            });
          })
        ).subscribe();

        this.storage.upload(filePathOne, this.selectedImageOne).snapshotChanges().pipe(
          finalize(() => {
            fileRefOne.getDownloadURL().subscribe((url) => {
              this.cadastroservicoForm.value.imagem1 = url;
              this.addServico(a);
              this.msg = true;
              this.imagemUmSrc = 'assets/img/placeholder.jpg';
              this.imagemDoisSrc = 'assets/img/placeholder.jpg';
              this.imagemTresSrc = 'assets/img/placeholder.jpg';
              this.imagemQuatroSrc = 'assets/img/placeholder.jpg';
              this.cadastroservicoForm.reset();
              this.textbtn = 'Cadastrar';
              setTimeout(() => {
                this.msg = false;
              }, 2000);
            });
          })
        ).subscribe();
      }
    } else if (this.selectedImageOne || this.selectedImageTwo || this.selectedImageThree || this.selectedImageFour) {

      if (this.selectedImageOne) {
        const filePathOne = `imagem/${this.selectedImageOne.name}_${new Date().getTime()}`;
        const fileRefOne = this.storage.ref(filePathOne);

        this.storage.upload(filePathOne, this.selectedImageOne).snapshotChanges().pipe(
          finalize(() => {
            fileRefOne.getDownloadURL().subscribe((url) => {
              this.cadastroservicoForm.value.imagem1 = url;
              this.updateServico(a);
            });
          })
        ).subscribe();
      } else {

      }

      if (this.selectedImageTwo) {
        const filePathTwo = `imagem/${this.selectedImageTwo.name}_${new Date().getTime()}`;
        const fileRefTwo = this.storage.ref(filePathTwo);

        this.storage.upload(filePathTwo, this.selectedImageTwo).snapshotChanges().pipe(
          finalize(() => {
            fileRefTwo.getDownloadURL().subscribe((url) => {
              this.cadastroservicoForm.value.imagem2 = url;
              this.updateServico(a);
            });
          })
        ).subscribe();
      }

      if (this.selectedImageThree) {
        const filePathThree = `imagem/${this.selectedImageThree.name}_${new Date().getTime()}`;
        const fileRefThree = this.storage.ref(filePathThree);

        this.storage.upload(filePathThree, this.selectedImageThree).snapshotChanges().pipe(
          finalize(() => {
            fileRefThree.getDownloadURL().subscribe((url) => {
              this.cadastroservicoForm.value.imagem3 = url;
              this.updateServico(a);
            });
          })
        ).subscribe();
      }

      if (this.selectedImageFour) {
        const filePathFour = `imagem/${this.selectedImageFour.name}_${new Date().getTime()}`;
        const fileRefFour = this.storage.ref(filePathFour);

        this.storage.upload(filePathFour, this.selectedImageFour).snapshotChanges().pipe(
          finalize(() => {
            fileRefFour.getDownloadURL().subscribe((url) => {
              this.cadastroservicoForm.value.imagem4 = url;
              this.updateServico(a);
            });
          })
        ).subscribe();
      }

    } else {
      this.updateServico(a);
    }
  }

  addServico(a: Cadastroservico) {
    this.apiService.addServico(a);
  }

  updateServico(a: Cadastroservico) {
    this.apiService.updateServico(a)
      .then(() => {
        this.imagemUmSrc = 'assets/img/placeholder.jpg';
        this.imagemDoisSrc = 'assets/img/placeholder.jpg';
        this.imagemTresSrc = 'assets/img/placeholder.jpg';
        this.imagemQuatroSrc = 'assets/img/placeholder.jpg';
        this.textbtn = 'Cadastrar';
        this.cadastroservicoForm.reset({
          nomeservico: '',
          imagem1: '',
          imagem2: '',
          imagem3: '',
          imagem4: '',
          valorservico: '',
          id: undefined
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  edit(a: Cadastroservico) {
    this.imagemUmSrc = a.imagem1;
    this.imagemDoisSrc = a.imagem2;
    this.imagemTresSrc = a.imagem3;
    a.imagem4 === '' ? this.imagemQuatroSrc = 'assets/img/placeholder.jpg' : this.imagemQuatroSrc = a.imagem4;
    this.textbtn = 'Atualizar';
    this.cadastroservicoForm.setValue(a);
  }

  delete(a: Cadastroservico) {
    this.apiService.deleteServico(a);
  }
  
  removeImg() {
    this.selectedImageFour = null;
    this.cadastroservicoForm.value.imagem4 = '';
    this.imagemQuatroSrc = 'assets/img/placeholder.jpg';
  }

}
