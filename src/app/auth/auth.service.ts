import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Usuario } from '../shared/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, from, throwError, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userCollection: AngularFirestoreCollection<Usuario> = this.afs.collection('users');

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { 
  }

  login(email: string, password: string): Observable<Usuario> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
        .pipe(
          switchMap(
            (u: firebase.auth.UserCredential) => this.userCollection.doc<Usuario>(u.user.uid).valueChanges()
          ),
          catchError(() => throwError('Usuário ou senha inválidos !'))
        );
  }

  getUser(): Observable<Usuario> {
    return this.afAuth.authState
    .pipe(
      switchMap(u => (u) ? this.userCollection.doc<Usuario>(u.uid).valueChanges() : of(null))
    );
  }

  async updateUserDate(u: auth.UserCredential) {
    try {
      const newUser: Usuario = {
        nome: u.user.displayName,
        sobrenome: '', endereco: '', cidade: '', estado: '', telefone: '',
        email: u.user.email,
        id: u.user.uid
      };
      await this.userCollection.doc(u.user.uid).set(newUser);
      return newUser;
    }
    catch (e) {
      throw new Error(e);
    }
  }
  
}
