import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Agendamento } from '../models/agendamento.model';
import { Cadastroservico } from '../models/cadastroservico.model';
import { Usuario } from '../models/user';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private agendamentoCollection: AngularFirestoreCollection<Agendamento> = this.afs.collection('agendamento');
  private cadastroservicoCollection: AngularFirestoreCollection<Cadastroservico> = this.afs.collection('cadastroservico');
  private usuariosCollection: AngularFirestoreCollection<Usuario> = this.afs.collection('users');

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {}

  getAgendamentos() {
    return this.agendamentoCollection.valueChanges();
  }

  getServicos() {
    return this.cadastroservicoCollection.valueChanges();
  }

  getUsuarios() {
    return this.usuariosCollection.valueChanges();
  }

  addAgendamento(a: Agendamento) {
    a.id = this.afs.createId();
    return this.agendamentoCollection.doc(a.id).set(a);
  }

  addServico(a: Cadastroservico) {
    a.id = this.afs.createId();
    return this.cadastroservicoCollection.doc(a.id).set(a);
  }

  deleteServico(a: Cadastroservico) {
    return this.cadastroservicoCollection.doc(a.id).delete();
  }

}
