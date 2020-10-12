import { Injectable } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Subject } from 'rxjs';
import { Message } from '../domain/message';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  messages: Message[] = [];
  isConnected: boolean = false;
  onMessages: Subject<Message[]> = new Subject();
  onConnected: Subject<boolean> = new Subject();

  constructor(private rxStompService: RxStompService) {
    this.openWebSocket();
  }

  openWebSocket = () => {
    this.rxStompService.stompClient.onConnect = this.openned;
    this.rxStompService.stompClient.onWebSocketClose = this.closed;
    this.rxStompService.stompClient.onWebSocketError = this.error;
    this.rxStompService.watch('/topic/greetings/').subscribe(this.handleMessage);
  }

  private openned = (event) => {
    console.log('Connected', event);
    this.setConnected(true);
  }

  private handleMessage = (event) => {
    console.log('receive ', event);
    let message = JSON.parse(event.body);
    this.messages.push(message);
    this.onMessages.next(this.messages);
  }

  private closed = (event) => {
    console.log('Closed ', event);
    this.setConnected(false);

  }

  public sendMessage = (message: Message) => {
    console.log('send ', message);
    this.rxStompService.publish({ destination: '/app/hello/', body: JSON.stringify(message) });
  }

  public webSocketClose = () => {
  }

  private setConnected = (bool: boolean) => {
    this.isConnected = bool;
    this.onConnected.next(this.isConnected);
  }

  private error(event) {
    console.error(event);

  }


}
