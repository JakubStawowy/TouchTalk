package pl.team.touchtalk.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.dao.GroupRepository;
import pl.team.touchtalk.dao.UserRepository;
import pl.team.touchtalk.dto.GroupTransferObject;
import pl.team.touchtalk.dto.UserTransferObject;
import pl.team.touchtalk.model.Group;
import pl.team.touchtalk.model.User;

import java.util.*;

/*
 * GroupController class
 *
 * @Author Jakub Stawowy
 * @Version 1.0
 * @Since 2021-05-02
 * */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/groups")
public class GroupController {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    @Autowired
    public GroupController(GroupRepository groupRepository, UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    @PostMapping(value = "/add")
     public void createGroup(@RequestBody JsonNode group) {
         Long id = group.get("creatorId").asLong();
         User user = userRepository.findById(id).orElse(null);
         String name = group.get("groupName").asText();
         String password = group.get("password").asText();
         Group newGroup = new Group(name, password);
         newGroup.addNewUser(user);
         groupRepository.save(newGroup);
     }

    @GetMapping({"", "/"})
    public Set<GroupTransferObject> index(@RequestParam("id") Long id) {

        Set<GroupTransferObject> groups = new LinkedHashSet<>();

        groupRepository.getGroupsByUserId(id).forEach(group -> {
            Set<UserTransferObject> users = new LinkedHashSet<>();
            group.getUsers().forEach(user -> users.add(new UserTransferObject(user)));

            groups.add(new GroupTransferObject(group, users));
        });

        return groups;
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupTransferObject> getGroup(@PathVariable("id") Long id) {

        Set<UserTransferObject> users = new LinkedHashSet<>();

        Optional<Group> optionalGroup = groupRepository.findById(id);
        if(optionalGroup.isPresent())
            return optionalGroup.map(group -> {
                group.getUsers().forEach(user -> users.add(new UserTransferObject(user)));
                return new ResponseEntity<>(new GroupTransferObject(group, users), HttpStatus.OK);
            }).get();
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/join")
     public String joinGroup(@RequestParam ("id") Long id, @RequestParam ("code") String code) {

         Group group = groupRepository.findByCode(code);
         group.addNewUser(userRepository.findById(id).orElse(null));
         groupRepository.save(group);

         return "Zostałeś dodany do grupy";

     }
     @GetMapping({"/user"})
     public List<Group> getGroups(@RequestParam ("id") Long id){
         return new ArrayList<>(groupRepository.getGroupsByUserId(id));
     }
}