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
