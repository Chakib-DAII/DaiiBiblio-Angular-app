import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {BooksService} from "./services/books.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {RouterModule, Routes} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { WelcomeComponent } from './welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import {Ng2CarouselamosModule} from "ng2-carouselamos";
import {NgxPaginationModule} from "ngx-pagination";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule} from "@angular/material";


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const appRoutes: Routes = [
  {path : 'auth/signup' , component : SignupComponent},
  {path : 'auth/signin' , component : SigninComponent},
  {path : 'welcome' , component : WelcomeComponent},
  {path : 'books' , canActivate: [AuthGuardService] , component : BookListComponent },
  {path : 'books/new' ,  canActivate: [AuthGuardService] , component : BookFormComponent },
  {path : 'books/view/:id' , canActivate: [AuthGuardService] , component : SingleBookComponent },
  {path : '' , redirectTo : 'welcome' , pathMatch : 'full'},
  {path : '**' , redirectTo : 'books'}

  ]
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent,
    WelcomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
    Ng2CarouselamosModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuardService,
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
