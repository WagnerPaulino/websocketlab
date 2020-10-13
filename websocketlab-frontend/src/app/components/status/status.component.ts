import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/service/websocket.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  constructor(public webSocketService: WebsocketService) { }

  ngOnInit(): void {
  }

}
