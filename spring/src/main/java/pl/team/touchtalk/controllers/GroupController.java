package pl.team.touchtalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.dao.GroupRepository;
import pl.team.touchtalk.dto.GroupTransferObject;
import pl.team.touchtalk.dto.UserTransferObject;
import pl.team.touchtalk.model.Group;

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

    @Autowired
    public GroupController(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @GetMapping({"", "/"})
    public Set<GroupTransferObject> index() {

        Set<GroupTransferObject> groups = new LinkedHashSet<>();

        groupRepository.findAll().forEach(group -> {
            Set<UserTransferObject> users = new LinkedHashSet<>();
            group.getUsers().forEach(user -> users.add(new UserTransferObject(
                    user.getId(),
                    user.getUserDetails().getName(),
                    user.getUserDetails().getSurname(),
                    user.getUserDetails().getPhone(),
                    user.getUserDetails().getImage()
            )));

            groups.add(new GroupTransferObject(
               group.getName(),
               group.getCode(),
                    users
            ));
        });

        return groups;
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupTransferObject> getGroup(@PathVariable("id") Long id) {

        Set<UserTransferObject> users = new LinkedHashSet<>();

        Optional<Group> optionalGroup = groupRepository.findById(id);
        if(optionalGroup.isPresent())
            return optionalGroup.map(group -> {
                group.getUsers().forEach(user -> users.add(new UserTransferObject(
                        user.getId(),
                        user.getUserDetails().getName(),
                        user.getUserDetails().getSurname(),
                        user.getUserDetails().getPhone(),
                        user.getUserDetails().getImage()
                )));

                return new ResponseEntity<>(new GroupTransferObject(
                        group.getName(),
                        group.getCode(),
                        users
                ), HttpStatus.OK);
            }).get();
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
}


// public class GroupController {

//     private final GroupRepository groupRepository;
//     private final UserRepository userRepository;

//     @Autowired
//     public GroupController(GroupRepository groupRepository, UserRepository userRepository) {
//         this.groupRepository = groupRepository;
//         this.userRepository = userRepository;
//     }

//     @GetMapping({"/groups"})
//     public List<Group> getGroups(@RequestParam ("id") Long id){
//         List<Group> groups = new ArrayList<>();
//         groupRepository.getGroupsByUserId(id).forEach(groups::add);
//         return groups;
//     }


//     @PostMapping(value = "/creategroup")
//     public void createGroup(@RequestBody JsonNode group) {
//         Long id = group.get("creatorId").asLong();
//         User user = userRepository.findById(id).orElse(null);
//         String name = group.get("groupName").asText();
//         String password = group.get("password").asText();
//         Group newGroup = new Group(name, password);
//         newGroup.addNewUser(user);
//         groupRepository.save(newGroup);
//     }

//     @PostMapping(value = "/joingroup")
//     public String joinGroup(@RequestParam ("id") Long id, @RequestParam ("code") String code) {

//         Group group = groupRepository.findByCode(code);
//         group.addNewUser(userRepository.findById(id).orElse(null));
//         groupRepository.save(group);

//         return "Zostałeś dodany do grupy";

//     }
// }
