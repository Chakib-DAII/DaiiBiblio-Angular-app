import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../../services/books.service";
import {Router} from "@angular/router";
import {Book} from "../../models/Book.model";

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  pdfIsUploading = false;
  ImageIsUploading = false;
  imageURL: string;
  imageUploaded = false;
  pdfURL: string;
  pdfUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group(
      {
        title: ['', Validators.required ],
        author: ['', Validators.required]
      }
    );
  }

  onSaveBook() {
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const newBook = new Book(title, author);

    if (this.imageURL && this.imageURL !== '') {
      newBook.photo = this.imageURL;
    }
    if (this.pdfURL && this.pdfURL !== '') {
      newBook.pdf = this.pdfURL;
    }
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File, type: string) {
    if (type === 'images') {
      this.setImageLoading();
    } else if (type === 'pdfs') {
      this.setPDFLoading();
    }
    this.booksService.uploadFile(file, type).then(
      (url: string) => {
        if (type === 'images') {
          this.imageURL = url;
          this.imageUploaded = true;
        } else if (type === 'pdfs')  {
          this.pdfURL = url;
          this.pdfUploaded = true;
        }
        this.unsetLoading();
      }
    );
  }

  detectImages(event) {
    var name = event.target.files[0].name;
    var type = event.target.files[0].type;
    var size = event.target.files[0].size;
    var modifiedDate = event.target.files[0].lastModifiedDate;

    console.log ('Name: ' + name + "\n" +
      'Type: ' + type + "\n" +
      'Last-Modified-Date: ' + modifiedDate + "\n" +
      'Size: ' + Math.round(size / 1024) + " KB");
    this.onUploadFile(event.target.files[0], 'images');
  }

  detectPDFs(event) {
    this.onUploadFile(event.target.files[0], 'pdfs');
  }

  setPDFLoading() {
    if (this.pdfIsUploading === false) {
      this.pdfIsUploading = true;
    } else {
      this.pdfIsUploading = false;
    }
  }

  setImageLoading() {
    if (this.ImageIsUploading === false) {
      this.ImageIsUploading = true;
    } else {
      this.ImageIsUploading = false;
    }
  }
  unsetLoading() {
    this.pdfIsUploading = false;
    this.ImageIsUploading = false;
  }
}
