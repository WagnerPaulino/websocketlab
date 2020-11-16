import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/domain/message';
import { WebsocketService } from 'src/app/service/websocket.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public message: Message = new Message();
  public messages: Subject<Message[]>;
  public onConnected: Subject<boolean> = new Subject<boolean>();
  public isConnected: boolean = false;

  constructor(public webSocketService: WebsocketService, private router: Router) { }

  ngOnInit(): void {
    if (!this.webSocketService.usuario) {
      this.router.navigate([''])
    }
    this.initComponent();
  }

  private initComponent() {
    this.onConnected = this.webSocketService.onConnected;
    this.messages = this.webSocketService.onMessages;
    this.webSocketService.onConnected.subscribe(bool => this.isConnected = bool);
  }

  submit() {
    if (this.isConnected) {
      this.message.user = this.webSocketService.usuario;
      this.webSocketService.sendMessage(this.message);
      this.message.message = '';
    }
  }

}
