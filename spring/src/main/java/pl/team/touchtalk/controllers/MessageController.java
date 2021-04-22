package pl.team.touchtalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.entities.Message;
import pl.team.touchtalk.repositories.MessageRepository;

import java.util.List;

/*
* MessageController class
*
* @Author Jakub Stawowy
* @Version 1.0
* @Since 2021-04-06
* */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageRepository repository;

    /*
    * constructor
    *
    * @Param repository MessageRepository
    * */
    @Autowired
    public MessageController(MessageRepository repository) {
        this.repository = repository;
    }

    /*
    * getUserMessages method
    *
    * @PathVariable id Long
    * @RequestParam receiverId
    * @Returns messages List of all messages found by senderId and receiverId
    * */
    @GetMapping("/{id}")
    public List<Message> getUserMessages(@PathVariable("id") Long id, @RequestParam("receiver_id") Long receiverId) {
        return repository.getAllBySenderAndReceivers(id, receiverId);
    }

    /*
    * getAllUserMessages method
    *
    * @PathVariable id userId
    * @Returns messages List of all messages sent and received
    * */
    @GetMapping("/all/{id}")
    public List<Message> getAllUserMessages(@PathVariable("id") Long id) {
        return repository.getAllBySenderAndReceivers(id, id);
    }
}
