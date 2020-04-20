import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Usuario } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, from, throwError, of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  textToConvert: string;
  private userCollection: AngularFirestoreCollection<Usuario> = this.afs.collection('users');
  private usuarioAutenticado = false;

  mostrarMenu = new EventEmitter<boolean>();

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

  // CADASTRO NOVO USUÁRIO
  cadastro(user: Usuario): Observable<boolean> {
    return from(this.afAuth.auth
        .createUserWithEmailAndPassword(user.email, user.password))
        .pipe(
          switchMap((u: firebase.auth.UserCredential) => this.userCollection.doc(u.user.uid)
            .set({...user, id: u.user.uid})
            .then(() => true)
          ),
          catchError((err) => throwError(err))
        );
  }

  // LOGIN E-MAIL E SENHA
  login(email: string, password: string): Observable<Usuario> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        switchMap((u: firebase.auth.UserCredential) => {
          this.usuarioAutenticado = true;
          this.mostrarMenu.emit(true);
          return this.userCollection.doc<Usuario>(u.user.uid).valueChanges();
        }),
        catchError(() => {
          this.usuarioAutenticado = false;
          this.mostrarMenu.emit(false);
          return throwError('Usuário ou senha inválidos !');
        })
      );
  }

  // OBTER USUÁRIO
  getUser(): Observable<Usuario> {
    return this.afAuth.authState
      .pipe(
        switchMap(u => (u) ? this.userCollection.doc<Usuario>(u.uid).valueChanges() : of(null))
      );
  }

  // AUTENTICAÇÃO DO USUÁRIO
  authenticated(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(map(u => (u) ? true : false));
  }


  // LOGIN GOOGLE COM OBSERVABLE
  loginGoogle(): Observable<Usuario> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.afAuth.auth.signInWithPopup(provider))
      .pipe(
        tap((data) => console.log(data)),
        switchMap((u: auth.UserCredential) => {
          const newUser: Usuario = {
            nome: u.user.displayName,
            sobrenome: '', telefone: '',
            email: u.user.email,
            id: u.user.uid
          };
          return this.userCollection.doc(u.user.uid)
            .set(newUser).then(() => newUser);
        })
      );
  }

  // LOGIN FACEBOOK COM OBSERVABLE
  loginFacebook(): Observable<Usuario> {
    const provider = new auth.FacebookAuthProvider();
    return from(this.afAuth.auth.signInWithPopup(provider))
      .pipe(
        tap((data) => console.log(data)),
        switchMap((u: auth.UserCredential) => {
          const newUser: Usuario = {
            nome: u.user.displayName,
            sobrenome: '', telefone: '',
            email: u.user.email,
            id: u.user.uid
          };
          return this.userCollection.doc(u.user.uid)
            .set(newUser).then(() => newUser);
        })
      );
  }

  // SAIR
  logout() {
    this.afAuth.auth.signOut();
  }

}
