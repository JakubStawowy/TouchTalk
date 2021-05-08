package pl.team.touchtalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.dto.UserTransferObject;
import pl.team.touchtalk.model.User;
import pl.team.touchtalk.model.UserDetails;
import pl.team.touchtalk.dao.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/*
 * UserController
 *
 * @Author Jakub Stawowy
 * @Version 1.0
 * @Since 2021-04-06
 * */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    /*
    * constructor
    *
    * @Param userRepository for saving and getting user from database
    * */
    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /*
    * getUsers method
    *
    * @RequestMapping /api/users/
    * @RequestMethod GET
    * @Returns users List - all users from database
    * */
    @GetMapping({"/", ""})
    public List<UserTransferObject> index(){
        List<UserTransferObject> users = new ArrayList<>();
        userRepository.findAll().forEach(user->
            users.add(new UserTransferObject(
                user.getId(),
              user.getUserDetails().getName(),
              user.getUserDetails().getSurname(),
              user.getUserDetails().getPhone(),
              user.getUserDetails().getImage()
            ))
        );
        return users;
    }

    /*
    * getUser method
    *
    * @RequestMapping /api/users/{id}
    * @RequestMethod GET
    * @PathVariable id Long
    * @Returns user User
    * */
    @GetMapping("/{id}")
    public ResponseEntity<UserTransferObject> getUser(@PathVariable("id") Long id){
        return userRepository.findById(id).map(
                user -> new ResponseEntity<>(new UserTransferObject(
                        user.getId(),
                        user.getUserDetails().getName(),
                        user.getUserDetails().getSurname(),
                        user.getUserDetails().getPhone(),
                        user.getUserDetails().getImage()
                ), HttpStatus.OK)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)
        );
    }

    /*
    * editUser method
    *
    * @RequestMapping /api/users/{id}/edit
    * @RequestMethod PUT
    * @RequestBody userDetails template
    * {
    *   "name": "<name>",
    *   "surname": "<surname>",
    *   "phone": "<phone>",
    *   "image": "<image>"
    * }
    *
    * @Returns user?null if no user found
    * */
    @PutMapping(path = "/{id}/edit", consumes = "application/json")
    public ResponseEntity<Boolean> editUser(@RequestBody UserDetails details, @PathVariable("id") Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setUserDetails(details);
            userRepository.save(user);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
    }
}
