import { Component, OnInit } from '@angular/core';
import {Book} from "../../models/Book.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../services/books.service";

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {
  loading = false;
  book: Book;

  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit() {
    this.setLoading();
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
        this.setLoading();
      }
    );
  }

  onBack() {
    this.router.navigate(['books']);
  }

  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
    this.router.navigate(['books']);
  }

  setLoading() {
    if (this.loading === false) {
      this.loading = true;
    } else {
      this.loading = false;
    }
  }
}
