import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewPage } from '../pages/new/new';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCSjgYwi3EewjnCFCm564udfsurD5RIUkM",
  authDomain: "follower-5350e.firebaseapp.com",
  databaseURL: "https://follower-5350e.firebaseio.com",
  storageBucket: "follower-5350e.appspot.com",
  messagingSenderId: "340331802320"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
