package pl.team.touchtalk.controllers;

import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.entities.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import pl.team.touchtalk.repositories.ChatRepository;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
public class ChatController {

	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	private final ChatRepository chatRepository;

	/*-------------------- Group (Public) chat--------------------*/
	@MessageMapping("/sendMessage")
	@SendTo("/topic/pubic")
	public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
		return chatMessage;
	}



	/*--------------------Private chat--------------------*/

	@Autowired
	public ChatController(ChatRepository chatRepository) {
		this.chatRepository = chatRepository;
	}

	@MessageMapping("/sendPrivateMessage")

	public void sendPrivateMessage(@Payload ChatMessage chatMessage) {
		chatRepository.save(chatMessage);
		simpMessagingTemplate.convertAndSendToUser(chatMessage.getReceiver().toString(), "/reply", chatMessage);


	}



	@GetMapping("/messagelist")
	public Iterable<ChatMessage> getChatMessage(){
		return chatRepository.findAll();
	}



	@GetMapping("/messagelist/{sender}/{receiver}")
	public List<ChatMessage> getAllChatMessageBySenderAndReceiver(@PathVariable("sender") Long sender, @PathVariable("receiver") Long receiver){
		return chatRepository.findAllBySenderAndReceiverOrReceiverAndSender(sender,receiver,sender,receiver);
	}





}
