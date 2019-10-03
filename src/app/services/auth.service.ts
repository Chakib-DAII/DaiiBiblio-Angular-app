import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createNewUser(email: string, password: string) {
    //creer un promise qui utilise l'API firabse pour créer compte selon choix dans dashbord Firebase
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email , password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

    signOutUser() {
      firebase.auth().signOut();
    }

}

