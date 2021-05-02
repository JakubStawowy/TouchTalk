package pl.team.touchtalk.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import pl.team.touchtalk.dto.GroupTransferObject;
import pl.team.touchtalk.dto.UserTransferObject;
import pl.team.touchtalk.model.Message;
import pl.team.touchtalk.dto.MessageTransferObject;
import pl.team.touchtalk.model.User;
import pl.team.touchtalk.dao.MessageRepository;
import pl.team.touchtalk.dao.UserRepository;

import java.util.*;


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
	public void sendPrivateMessage(@Payload MessageTransferObject messagePayload) {
		Optional<User> sender = userRepository.findById(messagePayload.getSender());
		Optional<User> receiver = userRepository.findById(messagePayload.getReceiver());

		if (sender.isPresent() && receiver.isPresent()) {
			Message message = new Message(
					messagePayload.getContent(),
					null,
					messagePayload.getType(),
					sender.get(),
					receiver.get()
			);
			messageRepository.save(message);
			simpMessagingTemplate.convertAndSendToUser(messagePayload.getReceiver().toString(), "/reply", messagePayload);
		}
	}

	@GetMapping("/messagelist")
	public Iterable<Message> getChatMessage(){
		return messageRepository.findAll();
	}

	@GetMapping("/messagelist/{sender}/{receiver}")
	public List<MessageTransferObject> getAllChatMessageBySenderAndReceiver(@PathVariable("sender") Long sender, @PathVariable("receiver") Long receiver){
		List<MessageTransferObject> messagesResponse = new ArrayList<>();

		// TOREMOVE
		Set<UserTransferObject> users = new LinkedHashSet<>();
		users.add(new UserTransferObject("Jacob", "Stawovy", null, null));
		users.add(new UserTransferObject("Grzegorz", "Szydlo", null, null));

		for(Message message: messageRepository.findAllBySenderAndReceiverOrReceiverAndSender(sender,receiver,sender,receiver)) {
			messagesResponse.add(new MessageTransferObject(
					message.getContent(),
					message.getType(),
					message.getSender().getId(),
					message.getReceiver().getId(),
					message.getSentAt(),
					new GroupTransferObject(
							"groupa1",
							"czx1223",
							users
					)
			));
		}
		return messagesResponse;
	}
}