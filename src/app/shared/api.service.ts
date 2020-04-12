import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Agendamento } from './agendamento.model';
import { Cadastroservico } from './cadastroservico.model';
import { Usuario } from './user';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private agendamentoCollection: AngularFirestoreCollection<Agendamento> = this.afs.collection('agendamento');
  private cadastroservicoCollection: AngularFirestoreCollection<Cadastroservico> = this.afs.collection('cadastroservico');
  private usuariosCollection: AngularFirestoreCollection<Usuario> = this.afs.collection('users');

  constructor(private afs: AngularFirestore) {}

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
