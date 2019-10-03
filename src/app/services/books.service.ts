import { Injectable } from '@angular/core';
import {Book} from "../models/Book.model";
import {Subject} from "rxjs/index";
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() { }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data) => {
          this.books = data.val() ? data.val() : [];
          this.emitBooks();
      }
      );
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id)
          .once('value')
          .then(
            (data) => {
              resolve(data.val());
            },
            (error) => {
              reject(error);
            }
          );
      }
    );
  }
  createNewBook(newBook: Book) {
      this.books.push(newBook);
      this.saveBooks();
      this.emitBooks();
  }

  removeBook(book: Book) {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée ! ');
        }
      ).catch(
        (error) => {
          console.log('fichier non trouvée ! ' + error);
        }
      );
    }
    if (book.pdf) {
      const storageRef = firebase.storage().refFromURL(book.pdf);
      storageRef.delete().then(
        () => {
          console.log('Pdf supprimée ! ');
        }
      ).catch(
        (error) => {
          console.log('fichier non trouvée ! ' + error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File , type: string) {
    return new Promise(
      (resolve, reject) => {
        //pour rendre le fichier uniaue
        const almostUniqueFileName = Date.now().toString();
        //creation de l'emplacement du fichier et le contenu to upload
        const upload = firebase.storage().ref()
          .child(type + '/' + almostUniqueFileName + file.name)
          .put(file);
        //terminaison de l'upload
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('chargement ...');
          },
          (error) => {
            console.log('erreur de chargement' + error);
            reject();
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
              resolve(downloadURL);
            });
          }
        );
      }
    );
  }
}
