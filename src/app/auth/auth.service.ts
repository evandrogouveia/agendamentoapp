import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Usuario } from '../shared/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, from, throwError, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userCollection: AngularFirestoreCollection<Usuario> = this.afs.collection('users');
  private usuarioAutenticado = false;
  mostrarMenu = new EventEmitter<boolean>();

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {}

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

  getUser(): Observable<Usuario> {
    return this.afAuth.authState
      .pipe(
        switchMap(u => (u) ? this.userCollection.doc<Usuario>(u.uid).valueChanges() : of(null))
      );
  }

  authenticated(): Observable<boolean> {
    return this.afAuth.authState
    .pipe(map(u => (u) ? true : false));
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
