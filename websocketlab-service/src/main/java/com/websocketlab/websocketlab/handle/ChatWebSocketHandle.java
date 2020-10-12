package com.websocketlab.websocketlab.handle;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
public class ChatWebSocketHandle {

	@MessageMapping("/hello")
	@SendToUser("/topic/greetings")
	@SendTo("/topic/greetings")
	public String greeting(@Payload String message) throws Exception {
		System.out.println(message);
		return message;
	}
	
}
