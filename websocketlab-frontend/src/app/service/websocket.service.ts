import { Injectable } from '@angular/core';
import { Message } from '../domain/message';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

const URL_WEBSOCKET = environment.urlWebsocket;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  webSocket: WebSocket;
  messages: Message[] = [];
  isConnected: boolean = false;
  onMessages: Subject<Message[]> = new Subject();
  onConnected: Subject<boolean> = new Subject();

  constructor() { }

  openWebSocket = () => {
    this.webSocket = new WebSocket(URL_WEBSOCKET);
    this.webSocket.onopen = this.openned;
    this.webSocket.onmessage = this.handleMessage;
    this.webSocket.onclose = this.closed;
  }

  private openned = (event) => {
    console.log('Connected', event);
    this.setConnected(true);
  }

  private handleMessage = (event) => {
    console.log('receive ', event);
    let message = JSON.parse(event.data);
    this.messages.push(message);
    this.onMessages.next(this.messages);
  }

  private closed = (event) => {
    console.log('Closed ', event);
    this.setConnected(false);

  }

  public sendMessage = (message: Message) => {
    console.log('send ', message);
    this.webSocket.send(JSON.stringify(message));
  }

  public webSocketClose = () => {
    this.webSocket.close();
  }

  private setConnected = (bool: boolean) => {
    this.isConnected = bool;
    this.onConnected.next(this.isConnected);
  }


}
