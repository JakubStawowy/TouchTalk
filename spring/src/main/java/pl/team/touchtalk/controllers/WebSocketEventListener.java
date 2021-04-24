//package pl.team.touchtalk.controllers;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.event.EventListener;
//import org.springframework.messaging.simp.SimpMessageSendingOperations;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.stereotype.Component;
//import org.springframework.web.socket.messaging.SessionConnectedEvent;
//import org.springframework.web.socket.messaging.SessionDisconnectEvent;
//import pl.team.touchtalk.entities.Message;
//import pl.team.touchtalk.enums.MessageType;
//
//import java.util.Objects;
//
//
//@Component
//public class WebSocketEventListener {
//
//    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);
//
//    private final SimpMessageSendingOperations messagingTemplate;
//
//    @Autowired
//    public WebSocketEventListener(SimpMessageSendingOperations messagingTemplate) {
//        this.messagingTemplate = messagingTemplate;
//    }
//
//    @EventListener
//    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
//        logger.info("Received a new web socket connection");
//    }
//
//    @EventListener
//    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
//        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
//
//        Long username = (Long) Objects.requireNonNull(headerAccessor.getSessionAttributes()).get("username");
//        Long privateUsername = (Long) headerAccessor.getSessionAttributes().get("private-username");
//        if(username != null) {
//            logger.info("User Disconnected : " + username);
//
//            Message chatMessage = new Message();
//            chatMessage.setType(MessageType.LEAVE);
//            chatMessage.setSender(username);
//
//            messagingTemplate.convertAndSend("/topic/pubic", chatMessage);
//        }
//
//        if(privateUsername != null) {
//            logger.info("User Disconnected : " + privateUsername);
//
//            ChatMessage chatMessage = new ChatMessage();
//            chatMessage.setType(MessageType.LEAVE);
//            chatMessage.setSender(privateUsername);
//
//            messagingTemplate.convertAndSend("/queue/reply", chatMessage);
//        }
//    }
//}
