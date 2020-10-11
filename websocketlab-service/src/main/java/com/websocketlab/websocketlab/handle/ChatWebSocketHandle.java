package com.websocketlab.websocketlab.handle;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatWebSocketHandle {

	  @MessageMapping("/hello")
	  @SendTo("/topic/greetings")
	  public String greeting(String message) throws Exception {
	    return message;
	  }
}
