package com.websocketlab.websocketlab.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.websocketlab.websocketlab.handle.ChatWebSocketHandle;

@Configuration
@EnableWebSocket
public class WebSocketConfiguration implements WebSocketConfigurer {

	private final static String CHAT_URL = "/chat";

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry arg0) {
		arg0.addHandler(getChatWebSocketHandle(), CHAT_URL).setAllowedOrigins("*");
	}

	@Bean
	public WebSocketHandler getChatWebSocketHandle() {
		return new ChatWebSocketHandle();
	}

}
