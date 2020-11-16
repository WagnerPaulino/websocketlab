import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { WebsocketService } from 'src/app/service/websocket.service';

@Component({
  selector: 'app-identificacao',
  templateUrl: './identificacao.component.html',
  styleUrls: ['./identificacao.component.scss']
})
export class IdentificacaoComponent implements OnInit {

  public user: string;

  @Output()
  public onComplete: Subject<String> = new Subject();

  constructor(private webSocket: WebsocketService) { }

  ngOnInit(): void {
  }

  submit() {
    this.onComplete.next(this.user);
    this.webSocket.setMessage({ user: this.user })
    this.webSocket.openWebSocket(this.user);
  }

}
