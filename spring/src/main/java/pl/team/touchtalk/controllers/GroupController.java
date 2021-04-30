package pl.team.touchtalk.controllers;


import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.entities.Group;
import pl.team.touchtalk.entities.User;
import pl.team.touchtalk.repositories.GroupRepository;
import pl.team.touchtalk.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
public class GroupController {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    @Autowired
    public GroupController(GroupRepository groupRepository, UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    @GetMapping({"/groups"})
    public List<Group> getGroups(@RequestParam ("id") Long id){
        List<Group> groups = new ArrayList<>();
        groupRepository.getGroupsByUserId(id).forEach(groups::add);
        return groups;
    }


    @PostMapping(value = "/creategroup")
    public void createGroup(@RequestBody JsonNode group) {
        Long id = group.get("creatorId").asLong();
        User user = userRepository.findById(id).orElse(null);
        String name = group.get("groupName").asText();
        String password = group.get("password").asText();
        Group newGroup = new Group(name, password);
        newGroup.addNewUser(user);
        groupRepository.save(newGroup);
    }

    @PostMapping(value = "/joingroup")
    public String joinGroup(@RequestParam ("id") Long id, @RequestParam ("code") String code) {

        Group group = groupRepository.findByCode(code);
        group.addNewUser(userRepository.findById(id).orElse(null));
        groupRepository.save(group);

        return "Zostałeś dodany do grupy";
    }
}
