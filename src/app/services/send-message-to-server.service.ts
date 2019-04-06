import { Injectable } from '@angular/core';
import { MessageModel } from '../models/message';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SendMessageToServerService {


  constructor(public http:HttpClient) { }
  local = true;
  serverURL = this.local?"http://127.0.0.1:5000/send-message":"https://www.google.lk";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Access-Control-Allow-Origin": "*"
    })
  };
  public sendMessage(message:MessageModel){
    console.log("sending message to python server");
    this.http.post<MessageModel>(this.serverURL, message,this.httpOptions)
      .toPromise()
      .catch(error=>console.log(error))
      .then(result=>console.log(result));
  }
}
