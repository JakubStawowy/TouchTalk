package pl.team.touchtalk.controllers;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import pl.team.touchtalk.dao.FileRepository;
import pl.team.touchtalk.dto.UserTransferObject;
import pl.team.touchtalk.model.File;
import pl.team.touchtalk.model.Message;
import pl.team.touchtalk.dto.MessageTransferObject;
import pl.team.touchtalk.model.User;
import pl.team.touchtalk.dao.MessageRepository;
import pl.team.touchtalk.dao.UserRepository;

import java.util.*;


@CrossOrigin("http://localhost:3000")
@RestController
//@RequestMapping("/msg")
public class MessageController {

	private final SimpMessagingTemplate simpMessagingTemplate;
	private final MessageRepository messageRepository;
	private final UserRepository userRepository;
	private final FileRepository fileRepository;

	@Autowired
	public MessageController(MessageRepository messageRepository, SimpMessagingTemplate simpMessagingTemplate, UserRepository userRepository, FileRepository fileRepository) {
		this.messageRepository = messageRepository;
		this.simpMessagingTemplate = simpMessagingTemplate;
		this.userRepository = userRepository;
		this.fileRepository = fileRepository;
	}

	@MessageMapping("/send")
	public void sendPrivateMessage(@Payload MessageTransferObject messagePayload) {
		Optional<User> sender = userRepository.findById(messagePayload.getSender());
		Optional<User> receiver = userRepository.findById(messagePayload.getReceiver());


		if (sender.isPresent() && receiver.isPresent()) {

			Message message = new Message(
					messagePayload.getContent(),
					sender.get(),
					receiver.get()
			);
			messageRepository.save(message);

			if (!messagePayload.getImageURL().equals(""))
			{
				File file = new File(messagePayload.getImageURL(), message);
				System.out.println("Przed filem kurka wodna");
				System.out.println(file.getFileUrl());
				System.out.println(message.getContent());
				fileRepository.save(file);


			}


			simpMessagingTemplate.convertAndSendToUser(messagePayload.getReceiver().toString(), "/reply", messagePayload);
		}
	}

	@GetMapping({"/", ""})
	public Iterable<Message> index(){
		return messageRepository.findAll();
	}



	@GetMapping("/messages")
	public List<MessageTransferObject> getAllChatMessageBySenderAndReceiver(@RequestParam("sender") Long sender, @RequestParam("receiver") Long receiver){
		List<MessageTransferObject> messagesResponse = new ArrayList<>();
		User userSender = userRepository.findById(sender).get();
		User userReceiver = userRepository.findById(receiver).get();

		for(Message message: messageRepository.findAllBySenderAndReceiverOrReceiverAndSender(userSender,userReceiver,userReceiver,userSender)) {
			messagesResponse.add(new MessageTransferObject(
					message.getId(),
					message.getContent(),
					message.getSender().getId(),
					message.getReceiver().getId(),
					message.getSentAt(),
					new UserTransferObject(
							message.getReceiver().getId(),
							message.getReceiver().getUserDetails().getName(),
							message.getReceiver().getUserDetails().getSurname(),
							message.getReceiver().getUserDetails().getPhone(),
							" "
					),
					""
					));
		}
		return messagesResponse;
	}


	@GetMapping("/imageMess/{id}")
	public String show(@PathVariable("id") Long id){
		File file = fileRepository.findFileUrlByMessageId(id);
		if(file == null) {
			return "Empty";
		}
		else {
			return file.getFileUrl();
		}

	}
}