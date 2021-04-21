package pl.team.touchtalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.entities.Message;
import pl.team.touchtalk.repositories.MessageRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageRepository repository;

    @Autowired
    public MessageController(MessageRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/{id}")
    public List<Message> getUserMessages(@PathVariable("id") Long id, @RequestParam("receiver_id") Long receiverId) {
        return repository.getAllBySenderAndReceivers(id, receiverId);
    }

    @GetMapping("/all/{id}")
    public List<Message> getAllUserMessages(@PathVariable("id") Long id) {
        return repository.getAllBySenderAndReceivers(id, id);
    }
}
