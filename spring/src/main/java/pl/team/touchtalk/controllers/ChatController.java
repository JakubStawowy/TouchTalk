package pl.team.touchtalk.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import pl.team.touchtalk.entities.Message;
import pl.team.touchtalk.entities.MessagePayload;
import pl.team.touchtalk.enums.MessageType;
import pl.team.touchtalk.repositories.MessageRepository;
import pl.team.touchtalk.repositories.UserRepository;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@CrossOrigin("http://localhost:3000")
@RestController
public class ChatController {

	private final SimpMessagingTemplate simpMessagingTemplate;
	private final MessageRepository messageRepository;
	private final UserRepository userRepository;

	@Autowired
	public ChatController(MessageRepository messageRepository, SimpMessagingTemplate simpMessagingTemplate, UserRepository userRepository) {
		this.messageRepository = messageRepository;
		this.simpMessagingTemplate = simpMessagingTemplate;
		this.userRepository = userRepository;
	}

	@MessageMapping("/sendPrivateMessage")
	public void sendPrivateMessage(@Payload MessagePayload messagePayload) {
		Message message = new Message();
		message.setContent(messagePayload.getContent());
		message.setType(messagePayload.getType());

		message.setSender(userRepository.findById(messagePayload.getSender()).orElse(null));
		message.setReceiver(userRepository.findById(messagePayload.getReceiver()).orElse(null));

		messageRepository.save(message);
		simpMessagingTemplate.convertAndSendToUser(messagePayload.getReceiver().toString(), "/reply", messagePayload);
	}

	@GetMapping("/messagelist")
	public Iterable<Message> getChatMessage(){
		return messageRepository.findAll();
	}

	@GetMapping("/messagelist/{sender}/{receiver}")
	public List<MessagePayload> getAllChatMessageBySenderAndReceiver(@PathVariable("sender") Long sender, @PathVariable("receiver") Long receiver){
		List<MessagePayload> messagesResponse = new ArrayList<>();
		for(Message message: messageRepository.findAllBySenderAndReceiverOrReceiverAndSender(sender,receiver,sender,receiver)) {
			messagesResponse.add(new MessagePayload(
					message.getContent(),
					message.getType(),
					message.getSender().getId(),
					message.getReceiver().getId(),
					message.getSentAt()
			));
		}
		return messagesResponse;
	}
}
