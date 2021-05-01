package pl.team.touchtalk.controllers;


/*
 * @Author Bartosz Szlęzak
 * @Author Grzegorz Szydło
 * @Author Paweł Szydło
 * @Author Łukasz Stolarz
 * @Version 2.0
 * @Since 2021-05-01
 * */


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.team.touchtalk.entities.*;
import pl.team.touchtalk.repositories.GroupMessageRepository;
import pl.team.touchtalk.repositories.GroupRepository;
import pl.team.touchtalk.repositories.MessageRepository;
import pl.team.touchtalk.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
public class GroupChatController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final UserRepository userRepository;
    private final GroupMessageRepository groupMessageRepository;
    private final GroupRepository groupRepository;

    @Autowired
    public GroupChatController(SimpMessagingTemplate simpMessagingTemplate, UserRepository userRepository, GroupMessageRepository groupMessageRepository, GroupRepository groupRepository) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.userRepository = userRepository;
        this.groupMessageRepository = groupMessageRepository;
        this.groupRepository = groupRepository;
    }

    @MessageMapping("/sendGroupMessage")
    public void sendGroupMessage(@Payload MessagePayload messagePayload) {
        Optional<User> sender = userRepository.findById(messagePayload.getSender());
        Optional<Group> group = groupRepository.findById(messagePayload.getReceiver());

        if (sender.isPresent() && group.isPresent()) {
            GroupMessage groupMessage = new GroupMessage(
                    messagePayload.getContent(),
                    null,
                    sender.get(),
                    group.get()
            );
            groupMessageRepository.save(groupMessage);
            simpMessagingTemplate.convertAndSendToUser(messagePayload.getReceiver().toString(), "/reply", messagePayload);
        }
    }

    @GetMapping("/messgrouplist")
    public Iterable<GroupMessage> getGroupMessage(){
        return groupMessageRepository.findAll();
    }

    @GetMapping("/messgrouplist/{receiver}")
    public List<MessagePayload> getAllGroupMessageByGroup(@PathVariable("receiver") Long group){
        List<MessagePayload> messagesResponse = new ArrayList<>();
        for(GroupMessage groupMessage: groupMessageRepository.findAllByGroupId(group)) {
            messagesResponse.add(new MessagePayload(
                    groupMessage.getContent(),
                    groupMessage.getSender().getId(),
                    groupMessage.getGroup().getId(),
                    groupMessage.getSentAt()
            ));
        }
        return messagesResponse;
    }
}
