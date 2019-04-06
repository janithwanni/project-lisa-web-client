import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { MessageModel } from './models/message';
import { SendMessageToServerService } from './services/send-message-to-server.service';
import { logging } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client-site';
  inputMessage = '';
  messageStore:Observable<MessageModel[]>;
  messagesRef:any;
  constructor(public afAuth: AngularFireAuth,public db: AngularFireDatabase,private server:SendMessageToServerService){
    afAuth.auth.onAuthStateChanged((user)=>{
      if(user){
        this.messagesRef = this.db.list<MessageModel>(user.uid+'/messages',ref=>ref.orderByChild('timestamp'));
        this.messageStore = this.messagesRef.valueChanges();
      }else{
        this.login();
      }
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  sendMessage(){
    let message = this.inputMessage;
    this.inputMessage = '';
    var date = new Date();
    var timestamp = date.getTime();
    let messageModel:MessageModel = {
      message: message,
      sender: this.afAuth.auth.currentUser.displayName,
      senderid:this.afAuth.auth.currentUser.uid,
      timestamp:-1*timestamp,
      day:date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      hour: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    }
    this.messagesRef.push(messageModel);
    console.log("Sent message to Firebase kiyala hithaganna");
    this.server.sendMessage(messageModel);
  }
}
