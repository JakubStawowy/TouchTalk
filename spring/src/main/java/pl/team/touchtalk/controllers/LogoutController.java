package pl.team.touchtalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.entities.User;
import pl.team.touchtalk.repositories.UserRepository;

import java.util.Optional;

/*
 * LoginController class
 *
 * @Author Jakub Stawowy
 * @Version 1.0
 * @Since 2021-04-24
 * */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api")
public class LogoutController {

    private final UserRepository repository;

    @Autowired
    public LogoutController(UserRepository repository) {
        this.repository = repository;
    }

    /*
     * logoutUser method
     *
     * @RequestParam id
     * @Returns responseEntity (method returns HttpStatus 200 code if user is present. Otherwise, it returns HttpStatus 400 code)
     * */
    @PutMapping(value = "/logout")
    public ResponseEntity<?> logoutUser(@RequestParam("userId")Long id) {
        Optional<User> loggedUser = repository.findById(id);

        if(loggedUser.isPresent()) {
            loggedUser.get().setLogged(false);
            repository.save(loggedUser.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
