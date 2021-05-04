package pl.team.touchtalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.model.User;
import pl.team.touchtalk.dao.UserRepository;

/*
* RegisterController
*
* @Author Jakub Stawowy
* @Version 1.0
* @Since 2021-04-06
* */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api")
public class RegisterController {

    private final UserRepository userRepository;

    /*
    * constructor
    *
    * @Param userRepository
    * */
    @Autowired
    public RegisterController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /*
    * registerUser method
    *
    * @RequestMapping /api/register
    * @RequestMethod POST
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
     * @Returns user
    * */
    @PostMapping(value = "/register", consumes = "application/json")
    public ResponseEntity<String> registerUser(@RequestBody User user) {

        if(userRepository.getUserByEmail(user.getEmail()).isPresent())
            return new ResponseEntity<>("User with this email already exists", HttpStatus.CONFLICT);

        String salt = BCrypt.gensalt();
        String hashedPassword = BCrypt.hashpw(user.getPassword(), salt);
        user.setPassword(hashedPassword);
        user.setSalt(salt);
        userRepository.save(user);

        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }
}
