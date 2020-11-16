package com.websocketlab.websocketlab.events;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpAttributesContextHolder;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.websocketlab.websocketlab.domain.Usuario;

@Component
@RestController
public class WebSocketEventListener {

	@Autowired
	private SimpMessagingTemplate template;

	public Map<String, Usuario> mapUsuario = new HashMap<>();

	@EventListener
	private void handleSessionConnected(SessionConnectEvent event) {
		String sessionId = SimpAttributesContextHolder.currentAttributes().getSessionId();
		Usuario usuario = Usuario.fromJson(event.getMessage().getHeaders().get("nativeHeaders").toString());
		mapUsuario.put(sessionId, usuario);

		template.convertAndSend("/topic/userEvents", mapUsuario.values());
	}

	@EventListener
	private void handleSessionDisconnect(SessionDisconnectEvent event) {
		String sessionId = SimpAttributesContextHolder.currentAttributes().getSessionId();
		mapUsuario.remove(sessionId);
		template.convertAndSend("/topic/userEvents", mapUsuario.values());
	}

	@GetMapping(path = "/usuarios")
	public Collection<Usuario> getUsuarios() {
		return mapUsuario.values();
	}

}
