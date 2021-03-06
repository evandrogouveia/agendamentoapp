import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Agendamento } from '../models/agendamento.model';
import { Cadastroservico } from '../models/cadastroservico.model';
import { Usuario } from '../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  agendamentos$: any = [];

  private agendamentoCollection:
    AngularFirestoreCollection<Agendamento> = this.afs.collection('agendamento');

  private cadastroservicoCollection:
    AngularFirestoreCollection<Cadastroservico> = this.afs.collection('cadastroservico', ref => {
      return ref.orderBy('nomeservico', 'asc');
    });

  private usuariosCollection:
    AngularFirestoreCollection<Usuario> = this.afs.collection('users');

  constructor(private afs: AngularFirestore) {}

  getAgendamentos() {
    return this.agendamentoCollection.valueChanges();
  }

  getAgendamentosUser(email) {
    this.agendamentos$ = this.afs.collection('agendamento', ref => ref.where('email', '==', email)
                         .orderBy('numeroagendamento','desc')).valueChanges();
    return this.agendamentos$
  }

  getServicos() {
    return this.cadastroservicoCollection.valueChanges();
  }

  getServicoDetalhe(servicoId: string): AngularFirestoreDocument<Cadastroservico> {
    return this.afs.collection('cadastroservico').doc(servicoId);
  }

  getUsuarios() {
    return this.usuariosCollection.valueChanges();
  }

  getUsuarioDetalhe(usuarioId: string): AngularFirestoreDocument<Usuario> {
    return this.afs.collection('users').doc(usuarioId);
  }

  addAgendamento(a: Agendamento) {
    a.id = this.afs.createId();
    return this.agendamentoCollection.doc(a.id).set(a);
  }

  addServico(a: Cadastroservico) {
    a.id = this.afs.createId();
    return this.cadastroservicoCollection.doc(a.id).set(a);
  }

  updateServico(a: Cadastroservico) {
    return this.cadastroservicoCollection.doc(a.id).set(a);
  }

  deleteServico(a: Cadastroservico) {
    return this.cadastroservicoCollection.doc(a.id).delete();
  }

  searchByName(name: string): Observable<Cadastroservico[]> {
    return this.afs.collection<Cadastroservico>('cadastroservico',
      ref => ref.orderBy('nomeservico').startAt(name).endAt(name + '\uf8ff')).valueChanges();

  }
}
