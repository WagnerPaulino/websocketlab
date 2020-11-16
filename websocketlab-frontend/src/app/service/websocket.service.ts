import { Injectable } from '@angular/core';
import { RxStompService, InjectableRxStompConfig } from '@stomp/ng2-stompjs';
import { Subject } from 'rxjs';
import { Message } from '../domain/message';
import { environment } from 'src/environments/environment';
import { Usuario } from '../domain/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  messages: Message[] = [];
  private message: Message = new Message();
  isConnected: boolean = false;
  onMessages: Subject<Message[]> = new Subject();
  onConnected: Subject<boolean> = new Subject();
  usuarios: Usuario[] = [];
  usuario: string;

  constructor(private rxStompService: RxStompService, private http: HttpClient) {
  }



  openWebSocket = (usuario) => {
    this.rxStompService.configure(myRxStompConfig(usuario));
    this.rxStompService.activate();
    this.rxStompService.connected$.subscribe(this.openned);
    this.rxStompService.stompClient.onWebSocketClose = this.closed;
    this.rxStompService.stompErrors$.subscribe(this.error);
  }

  private openned = (event) => {
    console.log('Connected', event);
    this.setConnected(this.rxStompService.connected());
    this.rxStompService.watch('/topic/greetings').subscribe(this.handleMessage);
    this.rxStompService.watch('/topic/userEvents').subscribe(({ body }) => {
      this.usuarios = JSON.parse(body);
      console.log(this.usuarios);
    });
    this.loadUsuarios();
  }

  private handleMessage = (event) => {
    console.log('receive ', event);
    let message = JSON.parse(event.body);
    this.messages.push(message);
    this.onMessages.next(this.messages);
  }

  private closed = (event) => {
    console.log('Closed ', event);
    this.setConnected(this.rxStompService.connected());

  }

  public sendMessage = (message: Message) => {
    console.log('send ', message);
    this.rxStompService.publish({ destination: '/app/hello', body: JSON.stringify(message) });
  }

  public webSocketClose = () => {
  }

  private setConnected = (bool: boolean) => {
    this.isConnected = bool;
    this.onConnected.next(this.isConnected);
  }

  private error(event) {
    console.log(event);

  }

  setMessage(message: Message) {
    this.message = message;
  }

  getMessage() {
    return this.message;
  }

  setUsuario(usuario: string) {
    this.usuario = usuario;
  }

  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  loadUsuarios() {
    this.http.get<Usuario[]>(`${environment.urlBackend}/usuarios`).subscribe(usuaurios => this.usuarios = usuaurios)
  }

}


function myRxStompConfig(username): InjectableRxStompConfig {
  return {
    brokerURL: environment.urlWebsocket,

    connectHeaders: {
      login: username,
      passcode: 'guest'
    },

    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,

    reconnectDelay: 200,

    debug: (msg: string): void => {
      console.log(msg);
    }
  }
};