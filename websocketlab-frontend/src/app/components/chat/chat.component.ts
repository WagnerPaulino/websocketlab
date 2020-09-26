import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/domain/message';
import { WebsocketService } from 'src/app/service/websocket.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public message: Message = new Message();
  public messages: Subject<Message[]>;
  public onConnected: Subject<boolean> = new Subject<boolean>();
  private isConnected: boolean = false;

  constructor(private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.initComponent();
  }

  private initComponent() {
    this.onConnected.next(false);
    this.onConnected = this.webSocketService.onConnected;
    this.messages = this.webSocketService.onMessages;
    this.webSocketService.onConnected.subscribe(bool => this.isConnected = bool);
  }

  submit() {
    if (this.isConnected) {
      this.webSocketService.sendMessage(this.message);
      this.message.message = '';
    }
  }

  conectar() {
    if (!this.isConnected) {
      this.webSocketService.openWebSocket();
    }
  }

  sair() {
    if (this.isConnected) {
      this.webSocketService.webSocketClose()
    }
  }

}
