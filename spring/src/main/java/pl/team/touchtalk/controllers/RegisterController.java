package pl.team.touchtalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.entities.User;
import pl.team.touchtalk.repositories.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api")
public class RegisterController {

    private final UserRepository userRepository;

    @Autowired
    public RegisterController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /*
    * @RequestBody template
    * {
    *   "email": "<email>",
    *   "password": "<password>",
    *   "confirmedPassword": "<confirmedPassword>",
    *   "userDetails": {
    *       "name": "<name>",
    *       "surname": "<surname>",
    *       "phone": "<phone>",
    *       "image": "<image>"
    *   }
    * }
    * */
    @PostMapping(value = "/register", consumes = "application/json")
    public User registerUser(@RequestBody User user) {
        String salt = BCrypt.gensalt();
        String hashedPassword = BCrypt.hashpw(user.getPassword(), salt);
        user.setPassword(hashedPassword);
        user.setSalt(salt);
        return userRepository.save(user);
    }
}
