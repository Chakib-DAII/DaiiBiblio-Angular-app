import { Component } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    let config = {
      apiKey: 'AIzaSyAgo6mvsvKu79Oh6Y1mlGHSNnMYcL2SPwY',
      authDomain: 'daiibiblio-eabdb.firebaseapp.com',
      databaseURL: 'https://daiibiblio-eabdb.firebaseio.com',
      projectId: 'daiibiblio-eabdb',
      storageBucket: 'daiibiblio-eabdb.appspot.com',
      messagingSenderId: '679723633302'
    };
    firebase.initializeApp(config);
  }


}
