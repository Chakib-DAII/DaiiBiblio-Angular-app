import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../models/Book.model";
import {Subscription} from "rxjs/index";
import {BooksService} from "../services/books.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {
  loading = false;
  books: Book[];
  booksSubscription: Subscription;

  constructor(private booksSerrvice: BooksService,
              private router: Router) { }

  ngOnInit() {
    this.setLoading();
    this.booksSubscription = this.booksSerrvice.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksSerrvice.getBooks();
    this.booksSerrvice.emitBooks();
    this.setLoading();
  }


  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book) {
    this.booksSerrvice.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

  setLoading() {
    if (this.loading === false) {
      this.loading = true;
    } else {
      this.loading = false;
    }
  }
}
