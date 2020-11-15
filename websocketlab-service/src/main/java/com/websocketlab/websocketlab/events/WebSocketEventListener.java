package com.websocketlab.websocketlab.events;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

	@Autowired
	private SimpMessagingTemplate template;

	@EventListener
	private void handleSessionConnected(SessionConnectEvent event) {
		template.convertAndSend("/topic/notify", "Usuario conectado");
		System.out.println("================================================ handleSessionConnected");
	}

	@EventListener
	private void handleSessionDisconnect(SessionDisconnectEvent event) {
		System.out.println("================================================ handleSessionDisconnect");
	}

}
