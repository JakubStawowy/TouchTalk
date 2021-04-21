package pl.team.touchtalk.controllers;

import com.sun.istack.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.entities.User;
import pl.team.touchtalk.entities.UserDetails;
import pl.team.touchtalk.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public List<User> getUsers(){
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    @GetMapping("/{id}")
    @Nullable
    public User getUser(@PathVariable("id") Long id){
        Optional<User> optionalUser = userRepository.findById(id);

        return optionalUser.orElse(null);
    }

    @PutMapping(path = "/{id}/edit", consumes = "application/json")
    @Nullable
    public User editUser(@RequestBody UserDetails details, @PathVariable("id") Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        optionalUser.ifPresent(value->{
            value.setUserDetails(details);
            userRepository.save(value);
        });
        return optionalUser.orElse(null);
    }
}
