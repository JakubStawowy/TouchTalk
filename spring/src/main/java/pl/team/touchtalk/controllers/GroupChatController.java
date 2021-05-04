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
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.dao.GroupRepository;
import pl.team.touchtalk.dao.UserRepository;
import pl.team.touchtalk.dto.GroupTransferObject;
import pl.team.touchtalk.dto.MessageTransferObject;
import pl.team.touchtalk.dto.UserTransferObject;
import pl.team.touchtalk.model.Group;
import pl.team.touchtalk.model.GroupMessage;
import pl.team.touchtalk.model.User;
import pl.team.touchtalk.dao.GroupMessageRepository;

import java.util.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api")
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
    public void sendGroupMessage(@Payload MessageTransferObject messageTransferObject) {
        Optional<User> sender = userRepository.findById(messageTransferObject.getSender());
        Optional<Group> group = groupRepository.findById(messageTransferObject.getReceiver());

        if (sender.isPresent() && group.isPresent()) {
            GroupMessage groupMessage = new GroupMessage(
                    messageTransferObject.getContent(),
                    null,
                    sender.get(),
                    group.get()
            );
            groupMessageRepository.save(groupMessage);
            simpMessagingTemplate.convertAndSendToUser(messageTransferObject.getReceiver().toString(), "/reply", messageTransferObject);
        }
    }

    @GetMapping("/messgrouplist")
    public Iterable<GroupMessage> getGroupMessage(){
        return groupMessageRepository.findAll();
    }

    @GetMapping("/messgrouplist/{receiver}")
    public List<MessageTransferObject> getAllGroupMessageByGroup(@PathVariable("receiver") Long group){
        List<MessageTransferObject> messagesResponse = new ArrayList<>();
        for(GroupMessage groupMessage: groupMessageRepository.findAllByGroupId(group)) {
            Set<UserTransferObject> users = new LinkedHashSet<>();
            groupMessage.getGroup().getUsers().forEach(user->users.add(new UserTransferObject(
                    user.getId(),
                    user.getUserDetails().getName(),
                    user.getUserDetails().getSurname(),
                    user.getUserDetails().getPhone(),
                    user.getUserDetails().getImage()
            )));
            messagesResponse.add(new MessageTransferObject(
                    groupMessage.getContent(),
                    groupMessage.getSender().getId(),
                    groupMessage.getGroup().getId(),
                    groupMessage.getSentAt(),
                    new GroupTransferObject(
                            groupMessage.getId(),
                            groupMessage.getGroup().getName(),
                            groupMessage.getGroup().getCode(),
                            users
                    )
            ));
        }
        return messagesResponse;
    }
}
