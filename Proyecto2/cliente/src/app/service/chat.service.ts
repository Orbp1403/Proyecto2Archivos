import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'
//import { Socket } from 'net';
import { Observable } from 'rxjs';
import { Mensaje } from '../Usuario';
//import {Observable}  from "rxjs/Observable"

@Injectable()

export class ChatService
{
  urlser = "http://192.168.1.9:8000";
  private socket = io(this.urlser);
  

  joinroom(data)
  {
    this.socket.emit('join', data);
  }

  newUserjoined()
  {
    let observable = new Observable<{user:String, message:String}>(observer => {
      this.socket.on('new user joined', (data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect()}
    })
    return observable;
  }

  leaveRoom(data)
  {
    this.socket.emit('leave', data);
  }

  userLeftRoom()
  {
    let observable = new Observable<{user:String, message:String}>(observer => {
      this.socket.on('left room', (data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect()}
    })
    return observable;
  }

  sendMessage(data)
  {
    this.socket.emit('message', data);
  }

  receivedMessage()
  {
    let observable = new Observable<{tipo : string, mensaje: string}>(observer => {
      this.socket.on('new message', (data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect()}
    })
    return observable;
  }
}