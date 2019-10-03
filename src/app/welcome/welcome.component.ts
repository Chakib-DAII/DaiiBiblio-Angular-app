import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';

import {Subscription} from 'rxjs/index';
import {Book} from '../models/Book.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  loading = false;
  books: Book[];
  booksSubscription: Subscription;

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.setLoading();
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.getBooks();
    this.booksService.emitBooks();
    this.setLoading();
  }

  setLoading() {
    if (this.loading === false) {
      this.loading = true;
    } else {
      this.loading = false;
    }
  }
}
